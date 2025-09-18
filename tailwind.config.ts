import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				surface: {
					dark: 'hsl(var(--surface-dark))',
					light: 'hsl(var(--surface-light))'
				}
			},
			boxShadow: {
				'subtle': 'var(--subtle-shadow)',
				'card': 'var(--card-shadow)',
				'hover': 'var(--hover-shadow)'
			},
			fontFamily: {
				'heading': 'var(--font-heading)',
				'body': 'var(--font-body)',
				'mono': 'var(--font-mono)'
			},
			borderRadius: {
				lg: 'var(--radius-lg)',
				md: 'var(--radius)',
				sm: 'calc(var(--radius) - 2px)',
				full: 'var(--radius-full)'
			},
			spacing: {
				'header': 'var(--header-height)',
				'section': 'var(--section-padding)'
			},
			maxWidth: {
				'content': 'var(--content-width)'
			},
			transitionTimingFunction: {
				'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fadeIn': {
					from: { 
						opacity: '0', 
						transform: 'translateY(20px)' 
					},
					to: { 
						opacity: '1', 
						transform: 'translateY(0)' 
					}
				},
				'slideUp': {
					from: { 
						opacity: '0', 
						transform: 'translateY(40px)' 
					},
					to: { 
						opacity: '1', 
						transform: 'translateY(0)' 
					}
				},
				'textReveal': {
					from: { 
						opacity: '0', 
						transform: 'translateY(100%)' 
					},
					to: { 
						opacity: '1', 
						transform: 'translateY(0)' 
					}
				},
				'slideInFromLeft': {
					from: { 
						opacity: '0', 
						transform: 'translateX(-100px)' 
					},
					to: { 
						opacity: '1', 
						transform: 'translateX(0)' 
					}
				},
				'slideInFromRight': {
					from: { 
						opacity: '0', 
						transform: 'translateX(100px)' 
					},
					to: { 
						opacity: '1', 
						transform: 'translateX(0)' 
					}
				},
				'scaleUp': {
					from: { 
						opacity: '0', 
						transform: 'scale(0.8)' 
					},
					to: { 
						opacity: '1', 
						transform: 'scale(1)' 
					}
				},
				'shimmer': {
					'0%': { 'background-position': '-1000px 0' },
					'100%': { 'background-position': '1000px 0' }
				},
				'glow': {
					'0%, 100%': { 'box-shadow': '0 0 5px hsl(var(--primary) / 0.5)' },
					'50%': { 'box-shadow': '0 0 20px hsl(var(--primary) / 0.8), 0 0 30px hsl(var(--primary) / 0.6)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' }
				},
				'rotate': {
					'from': { transform: 'rotate(0deg)' },
					'to': { transform: 'rotate(360deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fadeIn 0.8s ease-out',
				'slide-up': 'slideUp 0.6s ease-out',
				'text-reveal': 'textReveal 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
				'slide-in-left': 'slideInFromLeft 0.6s ease-out',
				'slide-in-right': 'slideInFromRight 0.6s ease-out',
				'scale-up': 'scaleUp 0.5s ease-out',
				'shimmer': 'shimmer 2s infinite',
				'glow': 'glow 2s ease-in-out infinite alternate',
				'float': 'float 4s ease-in-out infinite',
				'pulse-slow': 'pulse 2s infinite',
				'rotate-slow': 'rotate 20s linear infinite'
			}
		}
	},
	plugins: [import("tailwindcss-animate")],
} satisfies Config;
