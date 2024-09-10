import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, User, MessageSquare } from 'lucide-react';

const ContactSection = () => {
  return (
    <section
      id='#contact'
      className='py-20 bg-gradient-to-br from-background to-muted/20'
    >
      <div className='container mx-auto px-4'>
        <div className='flex flex-col lg:flex-row items-center gap-12'>
          <div className='lg:w-1/2 space-y-6'>
            <h2 className='text-4xl font-bold text-foreground'>
              İletişime Geçin
            </h2>
            <p className='text-xl text-muted-foreground'>
              Bizimle iletişime geçmek için formu doldurabilir ya da doğrudan
              mail adresimizden bize ulaşabilirsiniz.
            </p>
            <div className='flex items-center space-x-4'>
              <div className='w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center'>
                <Mail className='w-6 h-6 text-primary' />
              </div>
              <div>
                <h3 className='text-lg font-semibold text-foreground'>
                  Email Gönder
                </h3>
                <p className='text-muted-foreground'>cetvelapp@gmail.com</p>
              </div>
            </div>
          </div>
          <Card className='lg:w-1/2 w-full shadow-lg'>
            <CardContent className='p-6'>
              <form className='space-y-6'>
                <div className='space-y-2'>
                  <label
                    htmlFor='name'
                    className='text-sm font-medium text-foreground flex items-center gap-2'
                  >
                    <User className='w-4 h-4' /> İsim
                  </label>
                  <Input
                    id='name'
                    placeholder='İsminiz'
                    className='bg-background border-input'
                  />
                </div>
                <div className='space-y-2'>
                  <label
                    htmlFor='email'
                    className='text-sm font-medium text-foreground flex items-center gap-2'
                  >
                    <Mail className='w-4 h-4' /> E-Posta
                  </label>
                  <Input
                    id='email'
                    type='email'
                    placeholder='E-Posta adresiniz'
                    className='bg-background border-input'
                  />
                </div>
                <div className='space-y-2'>
                  <label
                    htmlFor='message'
                    className='text-sm font-medium text-foreground flex items-center gap-2'
                  >
                    <MessageSquare className='w-4 h-4' /> Mesajınız
                  </label>
                  <Textarea
                    id='message'
                    placeholder='Mesajınızı buraya yazın'
                    className='bg-background border-input'
                    rows={4}
                  />
                </div>
                <Button type='submit' className='w-full'>
                  Email Gönder
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
