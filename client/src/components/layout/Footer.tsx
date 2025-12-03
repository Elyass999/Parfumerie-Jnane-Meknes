import { useState } from "react";
import { Link } from "wouter";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, Send } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const footerLinks = {
  navigation: [
    { href: "/", label: "Accueil" },
    { href: "/produits", label: "Produits" },
    { href: "/galerie", label: "Galerie" },
    { href: "/a-propos", label: "À propos" },
  ],
  legal: [
    { href: "/mentions-legales", label: "Mentions légales" },
    { href: "/politique-confidentialite", label: "Politique de confidentialité" },
    { href: "/cgv", label: "CGV" },
  ],
  contact: [
    { icon: MapPin, text: "123 Rue de la Parfumerie, 75001 Paris" },
    { icon: Phone, text: "+33 1 23 45 67 89" },
    { icon: Mail, text: "contact@parfumerie-elegance.fr" },
  ],
  social: [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: SiWhatsapp, href: "https://wa.me/33123456789", label: "WhatsApp" },
  ],
};

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call - will be connected to backend later
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Inscription réussie !",
      description: "Vous recevrez bientôt nos dernières actualités.",
    });
    
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <footer className="bg-card border-t border-card-border" data-testid="footer">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2">
            <Link href="/">
              <a className="inline-flex items-center gap-2 mb-4">
                <span className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
                  P
                </span>
                <span className="font-serif text-2xl font-semibold">
                  Parfumerie Élégance
                </span>
              </a>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              Votre destination beauté depuis 2010. Découvrez notre sélection
              exclusive de parfums et cosmétiques de luxe.
            </p>

            {/* Newsletter Form */}
            <div className="max-w-md">
              <h4 className="font-semibold mb-3">Newsletter</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Inscrivez-vous pour recevoir nos offres exclusives et nouveautés.
              </p>
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex gap-2"
                data-testid="form-newsletter"
              >
                <Input
                  type="email"
                  placeholder="Votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                  data-testid="input-newsletter-email"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  data-testid="button-newsletter-submit"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <a
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      data-testid={`link-footer-${link.label.toLowerCase()}`}
                    >
                      {link.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              {footerLinks.contact.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-muted-foreground"
                >
                  <item.icon className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
                  <span className="text-sm">{item.text}</span>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Suivez-nous</h4>
              <div className="flex gap-3">
                {footerLinks.social.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors hover-elevate"
                    aria-label={social.label}
                    data-testid={`link-social-${social.label.toLowerCase()}`}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Parfumerie Élégance. Tous droits réservés.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {footerLinks.legal.map((link) => (
                <Link key={link.href} href={link.href}>
                  <a className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
