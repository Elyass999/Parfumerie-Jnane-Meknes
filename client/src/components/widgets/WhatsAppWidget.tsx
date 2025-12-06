import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Send, X, MessageCircle } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  selectIsWhatsAppOpen,
  toggleWhatsApp,
  closeWhatsApp,
  selectWhatsAppNumber,
} from "@/store/uiSlice";
import { buildWhatsAppUrl, openWhatsApp } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function WhatsAppWidget() {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsWhatsAppOpen);
  const whatsAppNumber = useSelector(selectWhatsAppNumber);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Bounce animation on initial load
    const timer = setTimeout(() => {
      gsap.from(".whatsapp-bubble", {
        scale: 0,
        duration: 0.5,
        ease: "back.out(1.7)",
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const finalMessage = message.trim() || "Bonjour! J'ai une question.";
    const url = buildWhatsAppUrl(whatsAppNumber, finalMessage);
    openWhatsApp(url);
    setMessage("");
    dispatch(closeWhatsApp());
  };

  const handleQuickMessage = () => {
    const url = buildWhatsAppUrl(
      whatsAppNumber,
      "Bonjour! J'aimerais avoir des informations sur vos produits."
    );
    openWhatsApp(url);
    dispatch(closeWhatsApp());
  };

  return (
    <div className="fixed bottom-4 right-4 z-50" data-testid="whatsapp-widget">
      {/* Chat Panel */}
      <div
        className={cn(
          "absolute bottom-16 right-0 transition-all duration-300 origin-bottom-right",
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        )}
      >
        <Card className="w-80 shadow-2xl" data-testid="whatsapp-panel">
          <CardHeader className="bg-green-600 text-white rounded-t-xl pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <SiWhatsapp className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-base font-medium">
                    Parfumerie Jnane Meknes
                  </CardTitle>
                  <p className="text-xs text-white/80">En ligne</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => dispatch(closeWhatsApp())}
                aria-label="Fermer"
                data-testid="button-close-whatsapp"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-4">
            {/* Welcome Message */}
            <div className="bg-muted rounded-lg p-3 mb-4">
              <p className="text-sm">
                Bonjour! Comment pouvons-nous vous aider aujourd'hui? Envoyez-nous un message et nous vous répondrons rapidement.
              </p>
            </div>

            {/* Quick Action */}
            <Button
              variant="outline"
              size="sm"
              className="w-full mb-4 gap-2"
              onClick={handleQuickMessage}
              data-testid="button-quick-message"
            >
              <MessageCircle className="h-4 w-4" />
              Demander des informations
            </Button>

            {/* Message Form */}
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                type="text"
                placeholder="Votre message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
                data-testid="input-whatsapp-message"
              />
              <Button
                type="submit"
                size="icon"
                className="bg-green-600 hover:bg-green-700"
                data-testid="button-send-whatsapp"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>

            <p className="text-xs text-muted-foreground mt-3 text-center">
              En cliquant sur envoyer, vous serez redirigé vers WhatsApp
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Floating Button */}
      <Button
        size="icon"
        className={cn(
          "whatsapp-bubble h-14 w-14 rounded-full shadow-lg bg-green-600 hover:bg-green-700 border-green-700",
          "transition-transform duration-300",
          isOpen && "rotate-180"
        )}
        onClick={() => dispatch(toggleWhatsApp())}
        aria-label={isOpen ? "Fermer le chat" : "Ouvrir le chat WhatsApp"}
        data-testid="button-whatsapp-toggle"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <SiWhatsapp className="h-7 w-7" />
        )}
      </Button>
    </div>
  );
}
