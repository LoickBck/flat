import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { User, Shield, Landmark, Trash2, PlusCircle, Save, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Section = ({ icon: Icon, title, children, className }) => (
    <div className={`space-y-6 border-t pt-6 first:border-t-0 first:pt-0 ${className}`}>
        <div className="flex items-center">
            <Icon className="w-6 h-6 mr-3 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        </div>
        <div className="pl-9 space-y-6">
            {children}
        </div>
    </div>
);

const FileUploadField = ({ id, label, description, onChange, fileName }) => (
    <div className="p-4 border rounded-lg bg-background/50">
        <Label htmlFor={id} className="font-semibold">{label}</Label>
        {description && <p className="text-xs text-muted-foreground mb-2">{description}</p>}
        <Input id={id} type="file" onChange={onChange} className="text-sm" />
        {fileName && <p className="text-xs text-green-600 mt-2">Fichier chargé : {fileName}</p>}
    </div>
);

const DeclarantForm = ({ index, onRemove, title, declarantData, updateDeclarantData, isGuarantor = false }) => {
    const handleInputChange = (e) => {
        updateDeclarantData(index, { ...declarantData, [e.target.name]: e.target.value });
    };
    
    const handleSelectChange = (name, value) => {
         updateDeclarantData(index, { ...declarantData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
             updateDeclarantData(index, { ...declarantData, [e.target.name]: { name: file.name, size: file.size } });
        }
    };

    const prefix = isGuarantor ? "guarantor" : `declarant-${index}`;
    
    return (
         <motion.div
            layout
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, x: -30, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="p-6 border rounded-xl bg-card/50 space-y-6 relative overflow-hidden"
        >
            <div className="flex justify-between items-start">
                <h4 className="font-semibold text-lg text-primary">{title}</h4>
                {onRemove && (
                     <Button variant="ghost" size="icon" onClick={onRemove} className="text-destructive hover:bg-destructive/10 -mt-2 -mr-2">
                        <Trash2 className="w-4 h-4" />
                    </Button>
                )}
            </div>

            <div className="space-y-4">
                 <h5 className="font-medium text-md">Informations personnelles</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><Label htmlFor={`${prefix}-fullname`}>Nom complet</Label><Input id={`${prefix}-fullname`} name="fullname" value={declarantData.fullname || ''} onChange={handleInputChange} placeholder="ex: Jean Dupont" /></div>
                    <div><Label htmlFor={`${prefix}-birthdate`}>Date de naissance</Label><Input id={`${prefix}-birthdate`} name="birthdate" value={declarantData.birthdate || ''} onChange={handleInputChange} type="date" /></div>
                </div>
            </div>

            <div className="space-y-4">
                 <h5 className="font-medium text-md">Situation professionnelle</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor={`${prefix}-status`}>Statut professionnel</Label>
                        <Select name="status" value={declarantData.status} onValueChange={(value) => handleSelectChange('status', value)}><SelectTrigger id={`${prefix}-status`}><SelectValue placeholder="Sélectionnez..." /></SelectTrigger><SelectContent><SelectItem value="salarie">Salarié</SelectItem><SelectItem value="independant">Indépendant</SelectItem><SelectItem value="etudiant">Étudiant</SelectItem><SelectItem value="sans-emploi">Sans emploi</SelectItem><SelectItem value="retraite">Retraité</SelectItem></SelectContent></Select>
                    </div>
                    <div><Label htmlFor={`${prefix}-income`}>Revenu mensuel net</Label><Input id={`${prefix}-income`} name="income" value={declarantData.income || ''} onChange={handleInputChange} type="number" placeholder="ex: 2500" /></div>
                     <div>
                        <Label htmlFor={`${prefix}-contract`}>Type de contrat</Label>
                         <Select name="contract" value={declarantData.contract} onValueChange={(value) => handleSelectChange('contract', value)}><SelectTrigger id={`${prefix}-contract`}><SelectValue placeholder="Sélectionnez..." /></SelectTrigger><SelectContent><SelectItem value="cdi">CDI</SelectItem><SelectItem value="cdd">CDD</SelectItem><SelectItem value="interim">Intérim</SelectItem><SelectItem value="independant">Indépendant</SelectItem><SelectItem value="etudiant">Étudiant</SelectItem><SelectItem value="autre">Autre</SelectItem></SelectContent></Select>
                    </div>
                    <div>
                        <Label htmlFor={`${prefix}-income-source`}>Source des revenus</Label>
                        <Input id={`${prefix}-income-source`} name="incomeSource" value={declarantData.incomeSource || ''} onChange={handleInputChange} placeholder="ex: Salaire, CPAS, Pension..." />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h5 className="font-medium text-md">Documents justificatifs</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FileUploadField id={`${prefix}-id-front`} name="idFront" onChange={handleFileChange} label="Carte d'identité (recto)" description=".pdf, .jpg, .png" fileName={declarantData.idFront?.name} />
                    <FileUploadField id={`${prefix}-id-back`} name="idBack" onChange={handleFileChange} label="Carte d'identité (verso)" description=".pdf, .jpg, .png" fileName={declarantData.idBack?.name} />
                    <FileUploadField id={`${prefix}-payslip-1`} name="payslip1" onChange={handleFileChange} label="Fiche de paie (mois 1)" description="La plus récente" fileName={declarantData.payslip1?.name} />
                    <FileUploadField id={`${prefix}-payslip-2`} name="payslip2" onChange={handleFileChange} label="Fiche de paie (mois 2)" fileName={declarantData.payslip2?.name} />
                    <FileUploadField id={`${prefix}-payslip-3`} name="payslip3" onChange={handleFileChange} label="Fiche de paie (mois 3)" fileName={declarantData.payslip3?.name} />
                    <FileUploadField id={`${prefix}-other-proof`} name="otherProof" onChange={handleFileChange} label="Autre justificatif de revenus" description="Attestation CPAS, ONEM..." fileName={declarantData.otherProof?.name} />
                </div>
            </div>
        </motion.div>
    );
}


const RentalApplicationFile = () => {
    const { toast } = useToast();
    const [declarants, setDeclarants] = useState([{}]);
    const [guarantor, setGuarantor] = useState({});
    const [hasGuarantor, setHasGuarantor] = useState(false);
    const [hasPastRent, setHasPastRent] = useState(false);
    const [pastRentProof, setPastRentProof] = useState(null);
    const [coverLetter, setCoverLetter] = useState('');
    const MAX_CHARS = 1500;

    useEffect(() => {
        const savedData = localStorage.getItem('rentalApplicationData');
        if (savedData) {
            const data = JSON.parse(savedData);
            setDeclarants(data.declarants || [{}]);
            setHasGuarantor(data.hasGuarantor || false);
            setGuarantor(data.guarantor || {});
            setHasPastRent(data.hasPastRent || false);
            setPastRentProof(data.pastRentProof || null);
            setCoverLetter(data.coverLetter || '');
        }
    }, []);

    const updateDeclarantData = (index, data) => {
        const newDeclarants = [...declarants];
        newDeclarants[index] = data;
        setDeclarants(newDeclarants);
    };
    
    const updateGuarantorData = (_, data) => {
        setGuarantor(data);
    };

    const addDeclarant = () => {
        setDeclarants([...declarants, {}]);
    };

    const removeDeclarant = (index) => {
        setDeclarants(declarants.filter((_, i) => i !== index));
    };

    const handlePastRentFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPastRentProof({ name: file.name, size: file.size });
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        const applicationData = {
            declarants,
            hasGuarantor,
            guarantor: hasGuarantor ? guarantor : {},
            hasPastRent,
            pastRentProof: hasPastRent ? pastRentProof : null,
            coverLetter,
            status: 'incomplete', 
        };
        
        const isComplete = declarants.every(d => d.fullname && d.income);
        applicationData.status = isComplete ? 'complete' : 'incomplete';

        localStorage.setItem('rentalApplicationData', JSON.stringify(applicationData));
        
        toast({
            title: "Dossier sauvegardé ! ✅",
            description: "Vos informations ont été enregistrées avec succès.",
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Mon Dossier Locatif</CardTitle>
                <CardDescription>
                    Ce dossier sera présenté aux propriétaires. Remplissez-le avec soin pour maximiser vos chances. Chaque co-déclarant doit fournir ses informations.
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSave}>
                <CardContent className="space-y-10">

                    <Section icon={User} title="Déclarants">
                       <div className="space-y-6">
                            <AnimatePresence>
                                {declarants.map((declarant, index) => (
                                    <DeclarantForm 
                                        key={index} 
                                        index={index}
                                        title={index === 0 ? 'Déclarant Principal' : `Co-déclarant #${index + 1}`}
                                        declarantData={declarant}
                                        updateDeclarantData={updateDeclarantData}
                                        onRemove={declarants.length > 1 ? () => removeDeclarant(index) : null} 
                                    />
                                ))}
                            </AnimatePresence>
                       </div>
                        <Button type="button" variant="outline" onClick={addDeclarant} className="w-full md:w-auto mt-6">
                            <PlusCircle className="w-4 h-4 mr-2" /> Ajouter un co-déclarant
                        </Button>
                    </Section>

                    <Section icon={Shield} title="Garant">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="has-guarantor" checked={hasGuarantor} onCheckedChange={setHasGuarantor} />
                            <Label htmlFor="has-guarantor">Je dispose d'un garant.</Label>
                        </div>
                        <AnimatePresence>
                        {hasGuarantor && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden pt-6">
                                 <DeclarantForm 
                                    index="guarantor"
                                    title="Informations du Garant"
                                    declarantData={guarantor}
                                    updateDeclarantData={updateGuarantorData}
                                    isGuarantor={true}
                                 />
                            </motion.div>
                        )}
                        </AnimatePresence>
                    </Section>
                    
                    <Section icon={Landmark} title="Historique locatif">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="has-past-rent" checked={hasPastRent} onCheckedChange={setHasPastRent} />
                            <Label htmlFor="has-past-rent">Je dispose de preuves de paiement de loyers précédents.</Label>
                        </div>
                        <AnimatePresence>
                        {hasPastRent && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                                <FileUploadField 
                                    id="past-rent-proof" 
                                    label="Preuves de paiement" 
                                    description="Reçus de loyer, extraits bancaires, etc." 
                                    onChange={handlePastRentFileChange}
                                    fileName={pastRentProof?.name}
                                />
                            </motion.div>
                        )}
                        </AnimatePresence>
                    </Section>

                     <Section icon={FileText} title="Lettre de présentation (optionnelle)">
                        <Textarea
                            id="cover-letter"
                            placeholder="Présentez-vous, expliquez votre situation, votre projet... C'est l'occasion de vous démarquer !"
                            value={coverLetter}
                            onChange={(e) => setCoverLetter(e.target.value)}
                            maxLength={MAX_CHARS}
                            className="min-h-[200px]"
                        />
                        <p className={`text-sm text-right ${coverLetter.length > MAX_CHARS ? 'text-destructive' : 'text-muted-foreground'}`}>
                            {coverLetter.length} / {MAX_CHARS}
                        </p>
                    </Section>

                </CardContent>
                <CardFooter>
                    <Button type="submit" size="lg">
                        <Save className="w-4 h-4 mr-2" />
                        Sauvegarder mon dossier
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
};

export default RentalApplicationFile;