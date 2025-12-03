import { Link } from "wouter";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-screen pt-20 flex items-center justify-center" data-testid="page-not-found">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-md mx-auto">
          {/* 404 Visual */}
          <div className="mb-8">
            <span className="font-serif text-8xl md:text-9xl font-bold text-primary/20">
              404
            </span>
          </div>

          <h1 className="font-serif text-2xl md:text-3xl font-semibold mb-4">
            Page non trouvée
          </h1>
          
          <p className="text-muted-foreground mb-8">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <Button className="gap-2" data-testid="button-home">
                <Home className="h-4 w-4" />
                Retour à l'accueil
              </Button>
            </Link>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => window.history.back()}
              data-testid="button-back"
            >
              <ArrowLeft className="h-4 w-4" />
              Page précédente
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
