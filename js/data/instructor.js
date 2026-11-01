/**
 * instructor.js · Datos del instructor.
 * No agregar certificaciones, logros ni cifras que no estén aquí.
 */
export const INSTRUCTOR = {
  name: 'Felipe Cuevas',
  fullName: 'Francisco Felipe Cuevas Cerón',
  role: 'Ingeniero informático · instructor experto en desarrollo web asistido por IA',
  // Foto: súbela a assets/img/felipe-cuevas.webp y cambia photoAvailable a true.
  // Mientras sea false (o si la imagen no carga) se muestran las iniciales.
  photo: 'assets/img/felipe-cuevas.webp',
  photoAvailable: false,
  initials: 'FC',
  metrics: [
    { value: '12+', label: 'años de docencia y desarrollo' },
    { value: '300+', label: 'profesionales formados' },
    { value: '11', label: 'certificaciones técnicas' },
  ],
  credentials: [
    { label: 'Claude Certified Developer – Foundations (Anthropic)', featured: true },
    { label: 'Oracle ×5' },
    { label: 'AWS ×3' },
    { label: 'Python (PCEP)' },
    { label: 'Gemini' },
  ],
  education: 'Diplomado en Andragogía y Formación Profesional, Universidad de Chile',
  career: ['INACAP', 'Duoc UC', 'IPLACEX', 'Alura Latam', 'Talento Digital'],
  community: 'Fundador de la Comunidad Pulso Devs',
  links: [
    { label: 'felipecuevas.dev', url: 'https://felipecuevas.dev', kind: 'web' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/ffelipecuevasc/', kind: 'linkedin' },
  ],
};
