import React from 'react';
    import { Helmet } from 'react-helmet';
    import { motion } from 'framer-motion';
    import { MessageSquare, Send, Paperclip, Search, Archive, Info } from 'lucide-react';
    import { useToast } from '@/components/ui/use-toast';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
    import { Card, CardContent } from '@/components/ui/card';

    const MessagesPage = () => {
        const { toast } = useToast();

        const handleAction = () => {
            toast({
                title: "🚧 Bientôt disponible !",
                description: "La messagerie interne sécurisée arrive prochainement.",
            });
        };

        const conversations = [
            { name: "Jean Dupont", property: "Appartement Grand-Place", lastMessage: "Bonjour, je suis intéressé par votre bien...", time: "10:42", unread: 2, avatar: "JD" },
            { name: "Agence ImmoPro", property: "Maison avec jardin", lastMessage: "Votre visite est confirmée pour...", time: "Hier", unread: 0, avatar: "AI" },
            { name: "Sarah Connor", property: "Studio lumineux", lastMessage: "Merci pour les informations !", time: "Lundi", unread: 0, avatar: "SC" },
        ];

        const selectedConversation = conversations[0];

        return (
            <>
                <Helmet>
                    <title>Messagerie - Flat</title>
                </Helmet>
                <div className="container mx-auto px-4 py-8">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center mb-8"
                    >
                        <MessageSquare className="w-10 h-10 mr-4 text-primary" />
                        <div>
                            <h1 className="text-4xl font-bold text-foreground">Messagerie</h1>
                            <p className="text-lg text-muted-foreground">Communiquez en toute sécurité avec les locataires et propriétaires.</p>
                        </div>
                    </motion.div>

                    <div className="border border-border rounded-xl h-[calc(100vh-280px)] flex bg-card overflow-hidden shadow-lg">
                        {/* Sidebar with conversations */}
                        <div className="w-full md:w-1/3 border-r border-border flex flex-col">
                            <div className="p-4 border-b border-border">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input placeholder="Rechercher..." className="pl-9" onClick={handleAction} />
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto">
                                {conversations.map((conv, index) => (
                                    <div key={index} className={`p-4 flex items-start space-x-3 cursor-pointer hover:bg-muted/50 ${index === 0 ? 'bg-muted' : ''}`} onClick={handleAction}>
                                        <Avatar>
                                            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${conv.name}`} alt={conv.name} />
                                            <AvatarFallback>{conv.avatar}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 overflow-hidden">
                                            <div className="flex justify-between items-center">
                                                <p className="font-semibold text-sm truncate">{conv.name}</p>
                                                <p className="text-xs text-muted-foreground">{conv.time}</p>
                                            </div>
                                            <p className="text-xs text-muted-foreground truncate font-semibold">{conv.property}</p>
                                            <div className="flex justify-between items-center mt-1">
                                                <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                                                {conv.unread > 0 && <span className="bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{conv.unread}</span>}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Chat window */}
                        <div className="hidden md:flex w-2/3 flex-col">
                            {selectedConversation ? (
                                <>
                                    <div className="p-4 border-b border-border flex justify-between items-center">
                                        <div>
                                            <h2 className="font-semibold text-lg">{selectedConversation.name}</h2>
                                            <p className="text-sm text-muted-foreground">{selectedConversation.property}, Bruxelles</p>
                                        </div>
                                        <Button variant="ghost" size="icon" onClick={handleAction}>
                                            <Info className="w-5 h-5" />
                                        </Button>
                                    </div>
                                    <div className="flex-1 p-6 overflow-y-auto bg-muted/20 space-y-4">
                                        <div className="flex justify-start">
                                            <div className="bg-background rounded-lg p-3 max-w-lg shadow-sm">
                                                <p className="text-sm">Bonjour, je suis très intéressé par votre appartement sur la Grand-Place. Serait-il possible d'organiser une visite ?</p>
                                                <p className="text-xs text-muted-foreground text-right mt-1">10:42</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-end">
                                            <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-lg shadow-sm">
                                                <p className="text-sm">Bonjour Jean, merci pour votre intérêt. Bien sûr, je vous invite à réserver un créneau via l'agenda sur la plateforme.</p>
                                                <p className="text-xs text-primary-foreground/80 text-right mt-1">10:45</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 border-t border-border bg-background">
                                        <div className="relative">
                                            <Input placeholder="Écrivez votre message..." className="pr-24" onClick={handleAction}/>
                                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                                                <Button variant="ghost" size="icon" onClick={handleAction}><Paperclip className="w-5 h-5 text-muted-foreground" /></Button>
                                                <Button size="icon" onClick={handleAction}><Send className="w-5 h-5" /></Button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                                    <MessageSquare className="w-20 h-20 text-muted-foreground/50 mb-4" />
                                    <h2 className="text-xl font-semibold text-foreground">Sélectionnez une conversation</h2>
                                    <p className="text-muted-foreground mt-2">Choisissez une conversation dans la liste pour afficher les messages.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    };

    export default MessagesPage;