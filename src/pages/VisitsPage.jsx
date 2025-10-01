import React from 'react';
    import { Helmet } from 'react-helmet';
    import { motion } from 'framer-motion';
    import { Calendar, Plus } from 'lucide-react';
    import { useToast } from '@/components/ui/use-toast';
    import { Button } from '@/components/ui/button';
    import FullCalendar from '@fullcalendar/react';
    import dayGridPlugin from '@fullcalendar/daygrid';
    import timeGridPlugin from '@fullcalendar/timegrid';
    import interactionPlugin from '@fullcalendar/interaction';
    import { Card, CardContent } from '@/components/ui/card';
    import { AuthContext } from '@/contexts/AuthContext';
    import { useContext } from 'react';

    const VisitsPage = () => {
        const { toast } = useToast();
        const { user } = useContext(AuthContext);
        const isOwner = user?.role === 'owner' || user?.role === 'agency';

        const handleAction = () => {
            toast({
                title: "🚧 Action non implémentée",
                description: "Cette interaction n'est pas encore fonctionnelle.",
            });
        };
        
        const ownerEvents = [
            { title: 'Visite - Jean D.', start: new Date().toISOString().split('T')[0] + 'T10:00:00', end: new Date().toISOString().split('T')[0] + 'T10:30:00', backgroundColor: '#3b82f6', borderColor: '#3b82f6' },
            { title: 'Visite - Sarah L.', start: new Date().toISOString().split('T')[0] + 'T11:00:00', end: new Date().toISOString().split('T')[0] + 'T11:30:00', backgroundColor: '#10b981', borderColor: '#10b981' },
            { title: 'Bloqué - Personnel', start: new Date().toISOString().split('T')[0] + 'T14:00:00', end: new Date().toISOString().split('T')[0] + 'T15:00:00', backgroundColor: '#f97316', borderColor: '#f97316' },
        ];

        const tenantEvents = [
            { title: 'Visite - Appartement Grand-Place', start: new Date().toISOString().split('T')[0] + 'T10:00:00', end: new Date().toISOString().split('T')[0] + 'T10:30:00', backgroundColor: '#3b82f6', borderColor: '#3b82f6' },
        ];

        const events = isOwner ? ownerEvents : tenantEvents;
        const pageTitle = isOwner ? 'Agenda des Visites' : 'Mes Visites';
        const pageDescription = isOwner ? 'Planifiez et visualisez vos rendez-vous.' : 'Retrouvez ici toutes vos visites planifiées.';
        
        return (
            <>
                <Helmet>
                    <title>{pageTitle} - Flat</title>
                </Helmet>
                <div className="container mx-auto px-4 py-8">
                     <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex justify-between items-center mb-8"
                    >
                        <div className="flex items-center">
                            <Calendar className="w-10 h-10 mr-4 text-primary" />
                            <div>
                                <h1 className="text-4xl font-bold text-foreground">{pageTitle}</h1>
                                <p className="text-lg text-muted-foreground">{pageDescription}</p>
                            </div>
                        </div>
                        {isOwner && (
                            <Button onClick={handleAction}>
                                <Plus className="w-4 h-4 mr-2" />
                                Créer un créneau
                            </Button>
                        )}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Card className="shadow-lg">
                            <CardContent className="p-4">
                                <FullCalendar
                                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                    headerToolbar={{
                                        left: 'prev,next today',
                                        center: 'title',
                                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                                    }}
                                    initialView="timeGridWeek"
                                    editable={isOwner}
                                    selectable={isOwner}
                                    selectMirror={true}
                                    dayMaxEvents={true}
                                    weekends={true}
                                    events={events}
                                    locale='fr'
                                    buttonText={{
                                        today:    "Aujourd'hui",
                                        month:    'Mois',
                                        week:     'Semaine',
                                        day:      'Jour',
                                    }}
                                    height="auto"
                                    select={handleAction}
                                    eventClick={handleAction}
                                    eventDrop={handleAction}
                                    eventResize={handleAction}
                                    allDaySlot={false}
                                    slotMinTime="08:00:00"
                                    slotMaxTime="20:00:00"
                                />
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </>
        );
    };

    export default VisitsPage;