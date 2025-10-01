import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, MapPin, Home, Euro, Image as ImageIcon, Plus, X, BedDouble, Ruler } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AddPropertyPage = () => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    propertyType: '',
    location: '',
    rent: '',
    surface: '',
    rooms: '',
    description: '',
    photos: [],
    condition: '',
    furnished: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
       toast({
        title: "🚧 Bientôt disponible !",
        description: "Le téléversement de photos sera bientôt activé.",
      });
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: '🚀 Annonce sauvegardée !',
      description: 'Votre bien a été ajouté à vos brouillons.',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-foreground">Ajouter un bien</h1>
        <p className="text-lg text-muted-foreground">Créez une annonce complète pour attirer les meilleurs locataires.</p>
      </motion.div>

      <motion.form 
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-card p-8 rounded-2xl border shadow-sm space-y-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Type de bien */}
          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">Type de bien</label>
            <Select onValueChange={(value) => handleInputChange('propertyType', value)} value={formData.propertyType}>
              <SelectTrigger><SelectValue placeholder="Sélectionnez un type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="appartement">Appartement</SelectItem>
                <SelectItem value="maison">Maison</SelectItem>
                <SelectItem value="studio">Studio</SelectItem>
                <SelectItem value="loft">Loft</SelectItem>
                <SelectItem value="duplex">Duplex</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Localisation */}
          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">Localisation</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input type="text" placeholder="Ville, code postal, adresse..." className="pl-10" value={formData.location} onChange={(e) => handleInputChange('location', e.target.value)} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Loyer */}
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Loyer (hors charges)</label>
              <div className="relative">
                <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input type="number" placeholder="950" className="pl-10" value={formData.rent} onChange={(e) => handleInputChange('rent', e.target.value)} />
              </div>
            </div>
            
            {/* Surface */}
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Surface</label>
              <div className="relative">
                 <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input type="number" placeholder="75" className="pl-10" value={formData.surface} onChange={(e) => handleInputChange('surface', e.target.value)} />
                 <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">m²</span>
              </div>
            </div>

            {/* Chambres */}
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Chambres</label>
              <div className="relative">
                <BedDouble className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input type="number" placeholder="2" className="pl-10" value={formData.rooms} onChange={(e) => handleInputChange('rooms', e.target.value)} />
              </div>
            </div>
        </div>
        
        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2 text-foreground">Description</label>
          <Textarea rows={5} placeholder="Décrivez votre bien, ses atouts, le quartier..." value={formData.description} onChange={(e) => handleInputChange('description', e.target.value)} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {/* État du bien */}
           <div>
            <label className="block text-sm font-medium mb-2 text-foreground">État du bien</label>
            <Select onValueChange={(value) => handleInputChange('condition', value)} value={formData.condition}>
              <SelectTrigger><SelectValue placeholder="Sélectionnez un état" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="neuf">Neuf</SelectItem>
                <SelectItem value="renove">Rénové</SelectItem>
                <SelectItem value="bon_etat">Bon état</SelectItem>
                <SelectItem value="a_renover">À rénover</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Meublé/Non meublé */}
          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">Ameublement</label>
            <Select onValueChange={(value) => handleInputChange('furnished', value)} value={formData.furnished}>
              <SelectTrigger><SelectValue placeholder="Meublé ou non ?" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="meuble">Meublé</SelectItem>
                <SelectItem value="non_meuble">Non meublé</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Photos */}
        <div>
          <label className="block text-sm font-medium mb-2 text-foreground">Photos</label>
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center bg-muted/20 hover:border-primary transition-colors">
            <label htmlFor="photo-upload" className="cursor-pointer">
              <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
              <p className="font-medium text-foreground">Cliquez ou glissez-déposez vos photos</p>
              <p className="text-sm text-muted-foreground">PNG, JPG, WebP jusqu'à 10MB</p>
            </label>
            <input id="photo-upload" type="file" className="hidden" multiple onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" />
          </div>
          {formData.photos.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {formData.photos.map((photo, index) => (
                <div key={index} className="relative group">
                  <img alt={`Aperçu ${index + 1}`} class="rounded-lg object-cover w-full h-32" src="https://images.unsplash.com/photo-1596823878968-8f1e390b416f" />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex justify-end gap-4 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => toast({ title: "Modifications annulées" })}>Annuler</Button>
            <Button type="submit">
                <Plus className="w-4 h-4 mr-2" />
                Enregistrer le bien
            </Button>
        </div>
      </motion.form>
    </div>
  );
};

export default AddPropertyPage;