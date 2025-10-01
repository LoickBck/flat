import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Shield, Landmark, FileText, Printer, Share2, Edit, AlertTriangle, MessageSquare } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const SectionPreview = ({ icon: Icon, title, children }) => (
    <div className="mb-6">
        <div className="flex items-center mb-3">
            <Icon className="w-5 h-5 mr-3 text-primary" />
            <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-primary/30 pb-1">{title}</h2>
        </div>
        <div className="pl-8 space-y-2 text-sm">
            {children}
        </div>
    </div>
);

const InfoLine = ({ label, value }) => (
    <div className="grid grid-cols-3 gap-2">
        <p className="font-semibold text-gray-600">{label}</p>
        <p className="col-span-2 text-gray-800">{value || 'Non spécifié'}</p>
    </div>
);


const RentalApplicationPreview = ({ isPdfMode = false }) => {
    const [dossier, setDossier] = useState(null);
    const { toast } = useToast();
    const navigate = useNavigate();
    const printRef = useRef();

    useEffect(() => {
        const savedData = localStorage.getItem('rentalApplicationData');
        if (savedData) {
            setDossier(JSON.parse(savedData));
        }
    }, []);

    const isComplete = dossier?.status === 'complete';
    
    const handleShare = () => {
         if (!isComplete) {
            toast({
                variant: "destructive",
                title: "Dossier incomplet",
                description: "Vous ne pouvez partager votre dossier que lorsqu'il est complet.",
            });
            return;
        }
        const shareLink = `${window.location.origin}/dossier/${btoa(JSON.stringify(dossier))}`;
        navigator.clipboard.writeText(shareLink);
        toast({
            title: "Lien de partage copié !",
            description: "Le lien sécurisé vers votre dossier a été copié dans le presse-papiers.",
        });
    };

    const handlePrint = async () => {
        toast({ title: "Préparation du PDF...", description: "Veuillez patienter." });
        
        const content = printRef.current;
        if (!content) return;

        const canvas = await html2canvas(content, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
        const imgData = canvas.toDataURL('image/png');
        
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = imgWidth / imgHeight;
        const pdfImgWidth = pdfWidth - 20; // 10mm margin on each side
        const pdfImgHeight = pdfImgWidth / ratio;
        
        let position = 10;
        let heightLeft = pdfImgHeight;

        pdf.addImage(imgData, 'PNG', 10, position, pdfImgWidth, pdfImgHeight);
        heightLeft -= (pdf.internal.pageSize.getHeight() - 20);

        while (heightLeft > 0) {
            pdf.addPage();
            position = -heightLeft -10;
            pdf.addImage(imgData, 'PNG', 10, position, pdfImgWidth, pdfImgHeight);
            heightLeft -= pdf.internal.pageSize.getHeight();
        }
        
        pdf.save('Dossier_Locatif_Flat.pdf');
    };

    if (!dossier) {
        return (
            <Card>
                <CardContent className="pt-6 text-center">
                    <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500" />
                    <h3 className="mt-2 text-lg font-medium">Aucun dossier trouvé</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Vous n'avez pas encore de dossier sauvegardé. Commencez par en créer un.
                    </p>
                    <Button className="mt-4" onClick={() => navigate('/tableau-de-bord/mon-dossier')}>
                        Créer mon dossier
                    </Button>
                </CardContent>
            </Card>
        );
    }

    const DeclarantPreview = ({ data, title }) => (
        <div className="p-4 border rounded-lg bg-gray-50/50 mb-4">
            <h3 className="font-bold text-lg text-primary mb-3">{title}</h3>
            <div className="space-y-2">
                <InfoLine label="Nom complet" value={data.fullname} />
                <InfoLine label="Date de naissance" value={data.birthdate} />
                <InfoLine label="Statut" value={data.status} />
                <InfoLine label="Revenu net/mois" value={`${data.income || 0} €`} />
                <InfoLine label="Type de contrat" value={data.contract} />
                <InfoLine label="Source de revenus" value={data.incomeSource} />
            </div>
        </div>
    );

    const documentList = (data) => Object.keys(data).filter(key => key.endsWith('Proof') || key.startsWith('payslip') || key.startsWith('id')).map(key => data[key]?.name).filter(Boolean);

    const DossierContent = () => (
         <div ref={printRef} className={`bg-white text-black ${isPdfMode ? 'w-[210mm] p-8' : 'w-full max-w-4xl mx-auto p-6 md:p-10 shadow-lg rounded-lg border'}`}>
            <header className="flex items-center justify-between pb-6 border-b-2 mb-8">
                <div className="flex items-center">
                    <img alt="logo flat" class="h-10 w-auto" src="https://images.unsplash.com/photo-1485531865381-286666aa80a9" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dossier de Candidature Locative</h1>
            </header>

            <main>
                <SectionPreview icon={User} title="Déclarants">
                    {dossier.declarants.map((declarant, index) => (
                        <DeclarantPreview key={index} data={declarant} title={index === 0 ? 'Déclarant Principal' : `Co-déclarant #${index + 1}`} />
                    ))}
                </SectionPreview>
                
                {dossier.coverLetter && (
                    <SectionPreview icon={MessageSquare} title="Lettre de motivation du candidat">
                        <p className="text-gray-700 italic whitespace-pre-wrap leading-relaxed">
                            {dossier.coverLetter}
                        </p>
                    </SectionPreview>
                )}

                {dossier.hasGuarantor && dossier.guarantor?.fullname && (
                    <SectionPreview icon={Shield} title="Garant">
                         <DeclarantPreview data={dossier.guarantor} title="Informations du Garant" />
                    </SectionPreview>
                )}

                {dossier.hasPastRent && (
                     <SectionPreview icon={Landmark} title="Historique Locatif">
                         <p className="italic text-gray-700">Le candidat a fourni des preuves de paiements de loyers précédents.</p>
                    </SectionPreview>
                )}

                <SectionPreview icon={FileText} title="Documents Fournis">
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {dossier.declarants.flatMap((d, i) => documentList(d).map(name => `(Déclarant ${i+1}) ${name}`)).map((doc, i) => <li key={i}>{doc}</li>)}
                        {dossier.hasGuarantor && documentList(dossier.guarantor).map((doc, i) => <li key={`g-${i}`}>(Garant) {doc}</li>)}
                        {dossier.hasPastRent && dossier.pastRentProof?.name && <li>{dossier.pastRentProof.name}</li>}
                    </ul>
                </SectionPreview>
            </main>
            
            <footer className="mt-10 pt-4 border-t text-xs text-center text-gray-500">
                Généré le {new Date().toLocaleDateString('fr-FR')} via Flat.
            </footer>
        </div>
    );

    if (isPdfMode) {
        return <DossierContent />;
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardContent className="p-4 md:p-6 flex flex-wrap gap-2 items-center justify-center bg-muted/50 border-b">
                    <Button onClick={() => navigate('/tableau-de-bord/mon-dossier')}>
                        <Edit className="w-4 h-4 mr-2" />
                        Retour à l'édition
                    </Button>
                    <Button onClick={handleShare} disabled={!isComplete}>
                        <Share2 className="w-4 h-4 mr-2" />
                        Partager
                    </Button>
                    <Button variant="outline" onClick={handlePrint}>
                        <Printer className="w-4 h-4 mr-2" />
                        Imprimer / PDF
                    </Button>
                </CardContent>
            </Card>
            <DossierContent />
        </div>
    );
};

export default RentalApplicationPreview;