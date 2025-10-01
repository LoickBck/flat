import React, { useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { FileText, CheckCircle, AlertTriangle, Edit, Share2, Printer, Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import RentalApplicationPreview from '@/components/tenant/RentalApplicationPreview';


const SavedFile = ({ dossier, setDossier }) => {
    const { toast } = useToast();
    const printRef = useRef();

    const isComplete = dossier.status === 'complete';
    const progress = isComplete ? 100 : 60; // Simplified progress

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

        const canvas = await html2canvas(content, { 
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff'
        });
        const imgData = canvas.toDataURL('image/png');
        
        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4'
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = canvasWidth / canvasHeight;
        
        let imgWidth = pdfWidth - 20; // with margin
        let imgHeight = imgWidth / ratio;
        
        let heightLeft = imgHeight;
        let position = 10; // top margin

        if (imgHeight < pdfHeight) {
             pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        } else {
             while (heightLeft > 0) {
                pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                heightLeft -= (pdfHeight - 20);
                if (heightLeft > 0) {
                    position = -heightLeft - 10;
                    pdf.addPage();
                }
            }
        }
        
        pdf.save('Dossier_Locatif_Flat.pdf');
    };

    const handleDelete = () => {
        localStorage.removeItem('rentalApplicationData');
        setDossier(null);
        toast({
            title: "Dossier supprimé",
            description: "Votre dossier a été retiré de la sauvegarde locale.",
        });
    };

    return (
        <>
            <Card className="bg-background border-primary/20 shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center"><FileText className="w-5 h-5 mr-3 text-primary" />Votre Dossier Locatif</span>
                        {isComplete ? (
                             <span className="text-sm font-medium text-green-600 flex items-center bg-green-100/50 text-green-800 px-2 py-1 rounded-md"><CheckCircle className="w-4 h-4 mr-2" />Dossier complet</span>
                        ) : (
                             <span className="text-sm font-medium text-yellow-600 flex items-center bg-yellow-100/50 text-yellow-800 px-2 py-1 rounded-md"><AlertTriangle className="w-4 h-4 mr-2" />Dossier incomplet</span>
                        )}
                    </CardTitle>
                    <CardDescription>
                        {isComplete ? "Votre dossier est prêt à être partagé avec des propriétaires." : "Continuez à remplir votre dossier pour augmenter vos chances."}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center space-x-4 mb-4">
                        <Progress value={progress} className="w-full" />
                        <span className="font-semibold text-primary">{progress}%</span>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-wrap gap-2">
                    <Link to="/tableau-de-bord/mon-dossier">
                        <Button>
                            <Edit className="w-4 h-4 mr-2" />
                            Modifier
                        </Button>
                    </Link>
                    <Link to="/tableau-de-bord/mon-dossier/apercu">
                        <Button variant="outline">
                            <Eye className="w-4 h-4 mr-2" />
                            Voir le dossier
                        </Button>
                    </Link>
                    <Button onClick={handleShare} disabled={!isComplete}>
                        <Share2 className="w-4 h-4 mr-2" />
                        Partager
                    </Button>
                    <Button variant="outline" onClick={handlePrint}>
                        <Printer className="w-4 h-4 mr-2" />
                        Imprimer en PDF
                    </Button>
                     <Button variant="destructive" size="icon" onClick={handleDelete} className="ml-auto">
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </CardFooter>
            </Card>

            {/* Hidden printable version for PDF generation */}
            <div className="absolute -left-[9999px] top-0" aria-hidden="true">
                <div ref={printRef}>
                    <RentalApplicationPreview isPdfMode={true} />
                </div>
            </div>
        </>
    );
};

export default SavedFile;