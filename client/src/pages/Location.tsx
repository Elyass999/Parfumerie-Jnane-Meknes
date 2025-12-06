import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { selectWhatsAppNumber } from "@/store/uiSlice";
import { buildWhatsAppUrl, openWhatsApp } from "@/lib/whatsapp";

const storeInfo = {
  address: "MAG 2 LOT JNANE MEKNES 2 MERJANE SEKNA A COTÉ DE HAMAM EL WAFAE,VILLE MEKNÈS",
  city: "MEKNÈS",
  phone: "+212619470601",
  email: "contact@Parfumerie_Jnane_Meknes.ma",
  hours: [
    { day: "Lundi - Jeudi", hours: "10h00 - 23h00" },
    { day: "Vendredi", hours: "16h00 - 23h00" },
    { day: "Samedi - Dimanche", hours: "10h00 - 23h00" },
  ],

};

export default function Location() {
  const contentRef = useRef<HTMLDivElement>(null);
  const whatsAppNumber = useSelector(selectWhatsAppNumber);

  useEffect(() => {
    document.title = "Localisation - Parfumerie Élégance";
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
    }, contentRef);

    return () => ctx.revert();
  }, []);


  const handleGetDirections = () => {
    window.open(
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3287.015576515947!2d-5.570470324321721!3d33.86652757322748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda05b005a733eed%3A0x7870e0a1a5a82235!2sParfumerie%20jnane%20meknes!5e1!3m2!1sen!2sma!4v1765020164404!5m2!1sen!2sma" ,
      "_blank"
    );
  };

  const handleWhatsAppContact = () => {
    const url = buildWhatsAppUrl(
      whatsAppNumber,
      "Bonjour! Je souhaite me rendre à votre boutique. Pouvez-vous me confirmer l'adresse?"
    );
    openWhatsApp(url);
  };

  return (
    <main className="min-h-screen pt-20 md:pt-24" data-testid="page-location">
      <div ref={contentRef} className="container mx-auto px-4 py-8">
        {/* Header */}
        <div data-animate className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
            Notre Boutique Localisation
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Rendez-nous visite pour découvrir notre collection complète et
            bénéficier de conseils personnalisés de nos experts.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Map Section */}
          <div data-animate className="lg:col-span-3">
            <Card className="overflow-hidden h-full min-h-[400px]">
              <div className="w-full h-full bg-muted relative">
                {/* Google Maps Embed */}
                <iframe
                  src={"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3287.015576515947!2d-5.570470324321721!3d33.86652757322748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda05b005a733eed%3A0x7870e0a1a5a82235!2sParfumerie%20jnane%20meknes!5e1!3m2!1sen!2sma!4v1765020164404!5m2!1sen!2sma"}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "400px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localisation de la boutique"
                  className="absolute inset-0"
                  data-testid="map-iframe"
                />
              </div>
            </Card>
          </div>

          {/* Info Section */}
          <div data-animate className="lg:col-span-2 space-y-6">
            {/* Address Card */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 font-serif text-xl">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  Adresse
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium mb-1">{storeInfo.address}</p>
                <p className="text-muted-foreground mb-4">{storeInfo.city}</p>
                <Button
                  variant="outline"
                  className="gap-2 w-full sm:w-auto"
                  onClick={handleGetDirections}
                  data-testid="button-get-directions"
                >
                  <Navigation className="h-4 w-4" />
                  Itinéraire
                </Button>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 font-serif text-xl">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={`tel:${storeInfo.phone.replace(/\s/g, "")}`}
                    className="hover:text-primary transition-colors"
                    data-testid="link-phone"
                  >
                    {storeInfo.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={`mailto:${storeInfo.email}`}
                    className="hover:text-primary transition-colors"
                    data-testid="link-email"
                  >
                    {storeInfo.email}
                  </a>
                </div>
                <Button
                  className="w-full gap-2 bg-green-600 hover:bg-green-700 border-green-700 mt-4"
                  onClick={handleWhatsAppContact}
                  data-testid="button-whatsapp-location"
                >
                  <SiWhatsapp className="h-4 w-4" />
                  Contacter via WhatsApp
                </Button>
              </CardContent>
            </Card>

            {/* Hours Card */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 font-serif text-xl">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  Horaires
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {storeInfo.hours.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-border last:border-0"
                    >
                      <span className="text-muted-foreground">{item.day}</span>
                      <span
                        className={`font-medium ${
                          item.hours === "Fermé" ? "text-muted-foreground" : ""
                        }`}
                      >
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>


      </div>
    </main>
  );
}
