import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { gsap } from "gsap";
import { Send, CheckCircle, Mail, Phone, MapPin } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { selectWhatsAppNumber } from "@/store/uiSlice";
import { buildWhatsAppUrl, openWhatsApp } from "@/lib/whatsapp";

const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Veuillez entrer une adresse email valide"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const whatsAppNumber = useSelector(selectWhatsAppNumber);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  useEffect(() => {
    document.title = "Contact - Parfumerie Jnane Meknes";
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-animate]", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      });
    }, formRef);

    return () => ctx.revert();
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    // Simulate API call - will be connected to backend later
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    toast({
      title: "Message envoyé !",
      description: "Nous vous répondrons dans les plus brefs délais.",
    });

    form.reset();

    // Reset success state after a delay
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleWhatsAppContact = () => {
    const url = buildWhatsAppUrl(
      whatsAppNumber,
      "Bonjour! J'ai une question concernant vos produits."
    );
    openWhatsApp(url);
  };

  return (
    <main className="min-h-screen pt-20 md:pt-24" data-testid="page-contact">
      <div ref={formRef} className="container mx-auto px-4 py-8">
        {/* Header */}
        <div data-animate className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
            Contactez-nous
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Une question, une suggestion ou besoin de conseils personnalisés ?
            Notre équipe est là pour vous répondre.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div data-animate className="lg:col-span-1 space-y-6">
            {/* Quick Contact Cards */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Téléphone</h3>
                    <a
                      href="tel:+212619470601"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      data-testid="link-contact-phone"
                    >
                      +212619470601
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a
                      href="mailto:contact@parfumerie-elegance.fr"
                      className="text-muted-foreground hover:text-primary transition-colors break-all"
                      data-testid="link-contact-email"
                    >
                      contact@Parfumerie_Jnane_Meknes.ma
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Adresse</h3>
                    <p className="text-muted-foreground">
                        MAG 2 LOT JNANE MEKNES 2 MERJANE SEKNA A COTÉ DE HAMAM EL WAFAE,VILLE MEKNÈS
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* WhatsApp CTA */}
            <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-600 flex items-center justify-center">
                    <SiWhatsapp className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Réponse Rapide</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Pour une réponse immédiate, contactez-nous via WhatsApp
                  </p>
                  <Button
                    className="w-full gap-2 bg-green-600 hover:bg-green-700 border-green-700"
                    onClick={handleWhatsAppContact}
                    data-testid="button-whatsapp-contact"
                  >
                    <SiWhatsapp className="h-4 w-4" />
                    Ouvrir WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div data-animate className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-2xl">
                  Envoyez-nous un message
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-xl mb-2">
                      Message Envoyé !
                    </h3>
                    <p className="text-muted-foreground">
                      Merci de nous avoir contactés. Nous vous répondrons dans
                      les plus brefs délais.
                    </p>
                  </div>
                ) : (
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                      data-testid="form-contact"
                    >
                      <div className="grid sm:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nom complet</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Votre nom"
                                  {...field}
                                  data-testid="input-contact-name"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="votre@email.com"
                                  {...field}
                                  data-testid="input-contact-email"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Votre message..."
                                className="min-h-[150px] resize-none"
                                {...field}
                                data-testid="textarea-contact-message"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full sm:w-auto gap-2"
                        disabled={isSubmitting}
                        data-testid="button-submit-contact"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            Envoi en cours...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            Envoyer le message
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
