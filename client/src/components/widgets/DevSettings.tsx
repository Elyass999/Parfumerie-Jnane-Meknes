// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Settings, X, Save } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { selectWhatsAppNumber, setDevWhatsAppNumber } from "@/store/uiSlice";
// import { useToast } from "@/hooks/use-toast";

// export function DevSettings() {
//   const dispatch = useDispatch();
//   const currentNumber = useSelector(selectWhatsAppNumber);
//   const [number, setNumber] = useState(currentNumber);
//   const [isOpen, setIsOpen] = useState(false);
//   const { toast } = useToast();

//   // Only show in development
//   if (import.meta.env.PROD) {
//     return null;
//   }

//   const handleSave = () => {
//     const cleanNumber = number.replace(/\D/g, "");
//     if (cleanNumber.length < 8) {
//       toast({
//         title: "Numéro invalide",
//         description: "Veuillez entrer un numéro de téléphone valide",
//         variant: "destructive",
//       });
//       return;
//     }

//     dispatch(setDevWhatsAppNumber(cleanNumber));
//     toast({
//       title: "Numéro mis à jour",
//       description: `Le numéro WhatsApp a été changé en +${cleanNumber}`,
//     });
//     setIsOpen(false);
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={setIsOpen}>
//       <DialogTrigger asChild>
//         <Button
//           variant="outline"
//           size="icon"
//           className="fixed bottom-4 left-4 z-50 opacity-50 hover:opacity-100"
//           aria-label="Paramètres développeur"
//           data-testid="button-dev-settings"
//         >
//           <Settings className="h-4 w-4" />
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <DialogTitle className="flex items-center gap-2">
//             <Settings className="h-5 w-5" />
//             Paramètres Développeur
//           </DialogTitle>
//           <DialogDescription>
//             Ces paramètres sont uniquement visibles en mode développement.
//           </DialogDescription>
//         </DialogHeader>

//         <div className="space-y-6 py-4">
//           <Card>
//             <CardHeader className="pb-3">
//               <CardTitle className="text-base">Numéro WhatsApp</CardTitle>
//               <CardDescription className="text-sm">
//                 Configurez le numéro WhatsApp utilisé pour les commandes.
//                 En production, utilisez la variable d'environnement VITE_WHATSAPP_NUMBER.
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="whatsapp-number">Numéro (avec indicatif pays)</Label>
//                 <div className="flex gap-2">
//                   <span className="flex items-center px-3 bg-muted rounded-md text-sm">
//                     +
//                   </span>
//                   <Input
//                     id="whatsapp-number"
//                     type="tel"
//                     placeholder="33612345678"
//                     value={number}
//                     onChange={(e) => setNumber(e.target.value)}
//                     className="flex-1"
//                     data-testid="input-whatsapp-number"
//                   />
//                 </div>
//                 <p className="text-xs text-muted-foreground">
//                   Exemple: 33612345678 pour un numéro français
//                 </p>
//               </div>

//               <Button onClick={handleSave} className="w-full gap-2" data-testid="button-save-whatsapp">
//                 <Save className="h-4 w-4" />
//                 Enregistrer
//               </Button>
//             </CardContent>
//           </Card>

//           <div className="p-4 bg-muted rounded-lg">
//             <h4 className="font-medium text-sm mb-2">Configuration en production</h4>
//             <p className="text-xs text-muted-foreground">
//               Définissez la variable d'environnement <code className="bg-background px-1 py-0.5 rounded">VITE_WHATSAPP_NUMBER</code> dans 
//               votre fichier .env ou dans les paramètres de déploiement.
//             </p>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }
