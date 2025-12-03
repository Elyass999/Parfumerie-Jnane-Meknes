import { useSelector, useDispatch } from "react-redux";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { selectCookieConsent, setCookieConsent } from "@/store/uiSlice";
import { cn } from "@/lib/utils";

export function CookieNotice() {
  const dispatch = useDispatch();
  const hasConsent = useSelector(selectCookieConsent);

  if (hasConsent) return null;

  return (
    <div
      className={cn(
        "fixed bottom-4 left-4 right-4 z-50 max-w-lg mx-auto",
        "animate-in slide-in-from-bottom-4 duration-500"
      )}
      data-testid="cookie-notice"
    >
      <Card className="shadow-xl">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Cookie className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold mb-1">Nous utilisons des cookies</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Ce site utilise des cookies pour améliorer votre expérience de
                navigation et vous proposer des contenus personnalisés.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  onClick={() => dispatch(setCookieConsent(true))}
                  data-testid="button-cookie-accept"
                >
                  Accepter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => dispatch(setCookieConsent(true))}
                  data-testid="button-cookie-decline"
                >
                  Refuser
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
