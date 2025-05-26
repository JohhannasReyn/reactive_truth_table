declare module '@/components/ui/input' {
    import { InputHTMLAttributes, forwardRef } from 'react';
    
    interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
      className?: string;
    }
    
    export const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
  }
  
  declare module '@/components/ui/button' {
    import { ButtonHTMLAttributes } from 'react';
    
    interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
      className?: string;
      variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
      size?: 'default' | 'sm' | 'lg' | 'icon';
    }
    
    export const Button: React.FC<ButtonProps>;
  }
  
  declare module '@/components/ui/card' {
    import { HTMLAttributes } from 'react';
    
    interface CardProps extends HTMLAttributes<HTMLDivElement> {
      className?: string;
    }
    
    export const Card: React.FC<CardProps>;
    export const CardHeader: React.FC<CardProps>;
    export const CardTitle: React.FC<CardProps>;
    export const CardContent: React.FC<CardProps>;
  }