import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Award, Calendar, GraduationCap, MessageCircle } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { openWhatsAppChat } from '@/utils/whatsapp';
import { useState } from 'react';

export function ProfessionalBioSection() {
  const [imgSrc, setImgSrc] = useState('/assets/generated/jessica-headshot-v2.dim_800x800.png');

  const handleImageError = () => {
    setImgSrc('/assets/generated/logo-jmf.dim_512x512.png');
  };

  return (
    <section id="bio" className="py-16 md:py-24">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2 bg-gradient-to-br from-primary/10 via-primary/5 to-background p-8 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-32 h-32 mx-auto rounded-full bg-primary/10 border-4 border-primary/20 flex items-center justify-center">
                    <img 
                      src={imgSrc}
                      alt="Jéssica Magaly Fowler" 
                      className="w-28 h-28 rounded-full object-cover"
                      onError={handleImageError}
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Jéssica Magaly Fowler</h3>
                    <p className="text-sm text-muted-foreground">Age 33</p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Badge variant="secondary">
                      <Award className="h-3 w-3 mr-1" />
                      ISSA Florida
                    </Badge>
                    <Badge variant="secondary">
                      <GraduationCap className="h-3 w-3 mr-1" />
                      Since 2018
                    </Badge>
                  </div>
                </div>
              </div>

              <CardContent className="md:col-span-3 p-8 space-y-6">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Your Transformation Partner</h2>
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <p className="text-muted-foreground leading-relaxed">
                      With over 8 years of experience as a Physical Education teacher and certified ISSA Personal Trainer and Nutritional Coach, I specialize in helping clients achieve sustainable body recomposition through evidence-based training and nutrition strategies.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mt-4">
                      My approach combines technical precision with motivational coaching to help you build strength, lose fat, and develop lifelong healthy habits. Whether you're just starting your fitness journey or looking to break through a plateau, I'll create a personalized plan that fits your lifestyle and goals.
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 pt-4">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <Calendar className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">Physical Education Teacher</p>
                      <p className="text-xs text-muted-foreground">Since 2018</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <Award className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">ISSA Certified</p>
                      <p className="text-xs text-muted-foreground">Personal Trainer</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 sm:col-span-2">
                    <GraduationCap className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">ISSA Nutritional Coach & Trainer</p>
                      <p className="text-xs text-muted-foreground">Specialized in body recomposition strategies</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <Button size="lg" onClick={openWhatsAppChat} className="w-full text-base">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Book Your Free Consultation
                  </Button>
                  <Button size="lg" variant="outline" onClick={openWhatsAppChat} className="w-full text-base">
                    <SiWhatsapp className="mr-2 h-5 w-5" />
                    Get in Touch on WhatsApp
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
