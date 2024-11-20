import localFont from 'next/font/local';

const geistvf = localFont({
    src: [
        { path: './fonts/GeistMonoVF.woff', weight: '700', style: 'normal' },
        { path: './fonts/GeistVF.woff', weight: '700', style: 'normal' },

    ],
    variable: '--font-geistvf',
});

export { geistvf };
