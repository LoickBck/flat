import React, { useState, useEffect } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { User, Home, Upload, Plus, Trash2, ArrowLeft, ArrowRight, XCircle as XIcon } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Checkbox } from '@/components/ui/checkbox';
    import { useToast } from '@/components/ui/use-toast';

    const STEPS = [
      { id: 1, title: "Déclarants", icon: User },
      { id: 2, title: "Préférences", icon: Home },
      { id: 3, title: "Documents", icon: Upload },
    ];
    
    const createNewDeclarant = () => ({
      id: Date.now() + Math.random(),
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        birthDate: '',
        nationality: '',
      },
      professionalStatus: '',
      netIncome: '',
      incomeSources: [],
    });

    const RegisterTenantPage = () => {
      const { toast } = useToast();
      const [currentStep, setCurrentStep] = useState(1);
      const [formData, setFormData] = useState({
        declarants: [createNewDeclarant()],
        preferences: {
          locations: [],
          propertyTypes: [],
          maxBudget: '',
        },
        documents: {}
      });

      useEffect(() => {
        const savedData = localStorage.getItem('tenantProfileDraft');
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          if(parsedData.declarants && parsedData.declarants.length > 0){
             setFormData(parsedData);
          }
        }
      }, []);

      useEffect(() => {
        localStorage.setItem('tenantProfileDraft', JSON.stringify(formData));
      }, [formData]);

      const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
      const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

      const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('tenantProfile', JSON.stringify(formData));
        localStorage.removeItem('tenantProfileDraft');
        toast({
          title: "Dossier finalisé avec succès !",
          description: "Nous vous contacterons dès que des biens correspondront à votre profil.",
          className: 'bg-primary text-primary-foreground',
        });
      };

      return (
        <div className="py-12 md:py-16">
          <div className="container px-4 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tighter mb-4">Créez votre dossier locataire</h1>
              <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl">
                Un dossier complet est votre meilleur atout pour trouver le logement idéal.
              </p>
            </motion.div>

            <div className="bg-card p-6 sm:p-8 rounded-xl border border-border">
              <div className="mb-8">
                <div className="flex justify-between items-center">
                  {STEPS.map((step, index) => (
                    <React.Fragment key={step.id}>
                      <div className="flex flex-col items-center text-center w-20">
                        <motion.div 
                          animate={{ 
                            scale: currentStep === step.id ? 1.1 : 1,
                            backgroundColor: currentStep >= step.id ? 'hsl(var(--primary))' : 'hsl(var(--muted))',
                            borderColor: currentStep >= step.id ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                            color: currentStep >= step.id ? 'hsl(var(--primary-foreground))' : 'hsl(var(--muted-foreground))'
                          }}
                          transition={{ duration: 0.3 }}
                          className={`h-12 w-12 rounded-full flex items-center justify-center border-2`}>
                          <step.icon className="h-6 w-6" />
                        </motion.div>
                        <p className={`mt-2 text-sm font-medium transition-colors ${currentStep >= step.id ? 'text-primary' : 'text-muted-foreground'}`}>{step.title}</p>
                      </div>
                      {index < STEPS.length - 1 && <div className={`flex-1 h-0.5 mx-2 transition-colors duration-500 ${currentStep > index + 1 ? 'bg-primary' : 'bg-border'}`} />}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    {currentStep === 1 && <Step1 formData={formData} setFormData={setFormData} />}
                    {currentStep === 2 && <Step2 formData={formData} setFormData={setFormData} />}
                    {currentStep === 3 && <Step3 formData={formData} setFormData={setFormData} toast={toast} />}
                  </motion.div>
                </AnimatePresence>

                <div className="mt-10 flex justify-between items-center pt-6 border-t border-border">
                  <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                    <ArrowLeft className="h-4 w-4 mr-2" /> Précédent
                  </Button>
                  {currentStep < STEPS.length ? (
                    <Button type="button" onClick={nextStep}>
                      Suivant <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button type="submit" size="lg" className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
                      Finaliser mon dossier
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    };

    const FormSection = ({ title, children }) => (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-3 mb-6">
          {title}
        </h2>
        {children}
      </div>
    );
    
    const DeclarantForm = ({ declarant, index, onDeclarantChange, onRemove }) => {
      const professionalStatuses = ["Salarié", "Étudiant", "Indépendant", "Inactif", "Retraité"];
      const incomeSourcesList = ["Salaire", "CPAS", "Chômage", "Pension", "Autre"];

      const handleInfoChange = (e) => {
        const { name, value } = e.target;
        onDeclarantChange(index, { ...declarant, personalInfo: { ...declarant.personalInfo, [name]: value } });
      };

      const handleFieldChange = (field, value) => {
        onDeclarantChange(index, { ...declarant, [field]: value });
      };
      
      const handleIncomeSourceChange = (source, checked) => {
        const newSources = checked
          ? [...declarant.incomeSources, source]
          : declarant.incomeSources.filter(s => s !== source);
        handleFieldChange('incomeSources', newSources);
      };

      return (
         <motion.div 
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-6 border border-border rounded-xl bg-muted/30 relative">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg text-primary">Déclarant {index + 1}</h3>
            {index > 0 && (
              <Button type="button" variant="ghost" size="icon" onClick={() => onRemove(declarant.id)} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                <Trash2 className="h-5 w-5" />
              </Button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor={`firstName-${declarant.id}`}>Prénom</Label>
                <Input id={`firstName-${declarant.id}`} name="firstName" value={declarant.personalInfo.firstName} onChange={handleInfoChange} required placeholder="Jean" />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`lastName-${declarant.id}`}>Nom</Label>
                <Input id={`lastName-${declarant.id}`} name="lastName" value={declarant.personalInfo.lastName} onChange={handleInfoChange} required placeholder="Dupont" />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`email-${declarant.id}`}>Email</Label>
                <Input id={`email-${declarant.id}`} name="email" type="email" value={declarant.personalInfo.email} onChange={handleInfoChange} required placeholder="jean.dupont@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`phone-${declarant.id}`}>Téléphone</Label>
                <Input id={`phone-${declarant.id}`} name="phone" type="tel" value={declarant.personalInfo.phone} onChange={handleInfoChange} required placeholder="0470 12 34 56" />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`birthDate-${declarant.id}`}>Date de naissance</Label>
                <Input id={`birthDate-${declarant.id}`} name="birthDate" type="date" value={declarant.personalInfo.birthDate} onChange={handleInfoChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`nationality-${declarant.id}`}>Nationalité</Label>
                <Input id={`nationality-${declarant.id}`} name="nationality" value={declarant.personalInfo.nationality} onChange={handleInfoChange} required placeholder="Belge" />
              </div>
              <div className="space-y-2">
                <Label>Statut professionnel</Label>
                <select className="flex h-11 w-full items-center justify-between rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" value={declarant.professionalStatus} onChange={(e) => handleFieldChange('professionalStatus', e.target.value)}>
                  <option value="">Sélectionnez...</option>
                  {professionalStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <Label>Revenu mensuel net (€)</Label>
                <Input type="number" value={declarant.netIncome} onChange={(e) => handleFieldChange('netIncome', e.target.value)} placeholder="2000" />
              </div>
              <div className="md:col-span-2 mt-4 space-y-2">
                  <Label>Sources de revenu</Label>
                  <div className="flex flex-wrap gap-x-6 gap-y-3">
                    {incomeSourcesList.map(source => (
                      <div key={source} className="flex items-center space-x-2">
                        <Checkbox
                          id={`income-${declarant.id}-${source}`}
                          checked={declarant.incomeSources.includes(source)}
                          onCheckedChange={(checked) => handleIncomeSourceChange(source, checked)}
                        />
                        <Label htmlFor={`income-${declarant.id}-${source}`} className="font-normal cursor-pointer">{source}</Label>
                      </div>
                    ))}
                  </div>
              </div>
          </div>
        </motion.div>
      );
    }
    
    const Step1 = ({ formData, setFormData }) => {
      const handleAddDeclarant = () => {
        setFormData(prev => ({
          ...prev,
          declarants: [...prev.declarants, createNewDeclarant()]
        }));
      };

      const handleRemoveDeclarant = (idToRemove) => {
        setFormData(prev => ({
          ...prev,
          declarants: prev.declarants.filter(d => d.id !== idToRemove)
        }));
      };

      const handleDeclarantChange = (index, updatedDeclarant) => {
        setFormData(prev => {
          const newDeclarants = [...prev.declarants];
          newDeclarants[index] = updatedDeclarant;
          return { ...prev, declarants: newDeclarants };
        });
      };
      
      return (
        <FormSection title="Qui compose votre ménage ?">
          <div className="space-y-8">
            <AnimatePresence>
            {formData.declarants.map((declarant, index) => (
              <DeclarantForm 
                key={declarant.id}
                declarant={declarant}
                index={index}
                onDeclarantChange={handleDeclarantChange}
                onRemove={handleRemoveDeclarant}
              />
            ))}
            </AnimatePresence>
          </div>
          <div className="mt-8 flex justify-center">
            <Button type="button" variant="outline" onClick={handleAddDeclarant}>
              <Plus className="h-4 w-4 mr-2" /> Ajouter un déclarant
            </Button>
          </div>
        </FormSection>
      );
    };


    const Step2 = ({ formData, setFormData }) => {
      const [currentLocation, setCurrentLocation] = useState('');

      const handleLocationKeyDown = (e) => {
        if (e.key === 'Enter' && currentLocation.trim() !== '') {
          e.preventDefault();
          if (!formData.preferences.locations.includes(currentLocation.trim())) {
            setFormData(prev => ({ ...prev, preferences: { ...prev.preferences, locations: [...prev.preferences.locations, currentLocation.trim()] } }));
          }
          setCurrentLocation('');
        }
      };

      const removeLocation = (locationToRemove) => {
        setFormData(prev => ({ ...prev, preferences: { ...prev.preferences, locations: prev.preferences.locations.filter(l => l !== locationToRemove) } }));
      };

      const handlePropertyTypeChange = (type) => {
        setFormData(prev => {
          const newTypes = prev.preferences.propertyTypes.includes(type)
            ? prev.preferences.propertyTypes.filter(t => t !== type)
            : [...prev.preferences.propertyTypes, type];
          return { ...prev, preferences: { ...prev.preferences, propertyTypes: newTypes } };
        });
      };

      const handleBudgetChange = (e) => {
        setFormData(prev => ({ ...prev, preferences: { ...prev.preferences, maxBudget: e.target.value } }));
      };

      const propertyTypes = ["Maison", "Appartement", "Kot", "Studio"];

      return (
        <FormSection title="Vos Préférences">
          <div className="space-y-2">
            <Label htmlFor="locations">Localisation(s) souhaitée(s)</Label>
            <p className="text-sm text-muted-foreground">Entrez une commune, un code postal ou un quartier et appuyez sur Entrée.</p>
            <div className="flex flex-wrap gap-2 items-center rounded-lg border border-input p-2.5 min-h-[44px]">
              {formData.preferences.locations.map((location, index) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={index} className="flex items-center gap-2 bg-secondary text-secondary-foreground rounded-md px-3 py-1.5 text-sm">
                  {location}
                  <button type="button" onClick={() => removeLocation(location)} className="text-secondary-foreground/70 hover:text-secondary-foreground">
                    <XIcon className="h-4 w-4" />
                  </button>
                </motion.div>
              ))}
              <Input id="locations" type="text" value={currentLocation} onChange={(e) => setCurrentLocation(e.target.value)} onKeyDown={handleLocationKeyDown} placeholder="Ex: 1000 Bruxelles..." className="flex-1 border-none shadow-none focus-visible:ring-0 h-auto p-0 bg-transparent" />
            </div>
          </div>
          <div className="space-y-4 pt-6">
            <Label>Type(s) de bien recherché</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {propertyTypes.map(type => (
                <div key={type} className="flex items-center space-x-3">
                  <Checkbox id={`type-${type}`} checked={formData.preferences.propertyTypes.includes(type)} onCheckedChange={() => handlePropertyTypeChange(type)} />
                  <Label htmlFor={`type-${type}`} className="font-normal cursor-pointer text-base">{type}</Label>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2 pt-6">
            <Label htmlFor="maxBudget">Budget maximum souhaité (€)</Label>
            <Input id="maxBudget" name="maxBudget" type="number" value={formData.preferences.maxBudget} onChange={handleBudgetChange} required placeholder="1200" />
          </div>
        </FormSection>
      );
    };

    const FileUploadArea = ({ title, description, onFileChange }) => (
      <div className="border-2 border-dashed border-border rounded-xl p-6 text-center bg-muted/30 hover:border-primary hover:bg-muted/50 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
        <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
        <Label htmlFor={`files-${title}`} className="text-primary font-semibold cursor-pointer">{title}</Label>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
        <Input id={`files-${title}`} type="file" multiple className="hidden" onChange={onFileChange} />
      </div>
    );

    const Step3 = ({ toast }) => {
      const handleFileChange = () => {
        toast({
          title: "🚧 Cette fonctionnalité n'est pas encore implémentée—mais ne vous inquiétez pas ! Vous pouvez la demander dans votre prochaine requête ! 🚀"
        });
      };

      return (
        <FormSection title="Vos Documents">
          <p className="text-muted-foreground">Accélérez le processus en téléchargeant vos documents. Ils sont stockés de manière sécurisée et ne seront partagés qu'avec votre accord.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FileUploadArea title="Carte d'identité (recto/verso)" description="Pièce d'identité de chaque adulte." onFileChange={handleFileChange} />
            <FileUploadArea title="3 dernières fiches de paie" description="Ou autre justificatif de revenus." onFileChange={handleFileChange} />
            <FileUploadArea title="Attestation d'aide publique" description="Si applicable (CPAS, chômage...)." onFileChange={handleFileChange} />
            <FileUploadArea title="Justificatifs de revenus complémentaires" description="Garant, pension, etc." onFileChange={handleFileChange} />
          </div>
        </FormSection>
      );
    };

    export default RegisterTenantPage;