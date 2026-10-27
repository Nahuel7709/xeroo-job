// Todo el contenido de la página está acá: editá este archivo para cambiar textos.

export const profile = {
  name: 'Nahuel Menichetti',
  handle: 'Nahuel7709',
  avatar: 'https://github.com/Nahuel7709.png',
  email: 'nahuel.d.menichetti@gmail.com',
  linkedin: 'https://www.linkedin.com/in/nahuelmenichetti/',
  github: 'https://github.com/Nahuel7709',
  demo: 'https://car-rental-xi-teal-49.vercel.app',
  repo: 'https://github.com/Nahuel7709/Car-Rental',
  cv: '/Nahuel-Menichetti-CV.pdf',
}

export const labels = [
  { name: 'full-stack', color: '#0969da' },
  { name: 'full-time', color: '#1f883d' },
  { name: 'híbrido', color: '#8250df' },
  { name: 'buenos-aires', color: '#bf8700' },
]

export type CheckStatus = 'success' | 'pending'

export const checks: { status: CheckStatus; name: string; detail: string }[] = [
  {
    status: 'success',
    name: 'Conocimientos de programación y desarrollo web',
    detail:
      'React y TypeScript en Globant; aplicaciones full-stack propias con Node.js, Express y PostgreSQL.',
  },
  {
    status: 'success',
    name: 'Ganas de aprender y crecer',
    detail:
      'Car Rental lo construí por tickets, con code review de un ingeniero senior. En paralelo, Ciencias de la Computación en UADE.',
  },
  {
    status: 'success',
    name: 'Iniciativa para resolver problemas',
    detail:
      'Reservas dentro de una transacción que bloquea el auto, para que no haya dobles reservas. Medí en producción por cuántos proxies pasa cada request en vez de suponerlo.',
  },
  {
    status: 'success',
    name: 'Trabajo en equipo',
    detail:
      'Ciclo Scrum completo en Globant (planning, dailies, code reviews, retros) junto a backend, QA y un project manager.',
  },
  {
    status: 'success',
    name: 'React · JavaScript · APIs · Bases de datos',
    detail: 'APIs REST con JWT y roles, PostgreSQL y MySQL, Prisma y TypeORM, tests con Vitest y Jest.',
  },
  {
    status: 'success',
    name: 'Inteligencia artificial',
    detail:
      'En Globant usé la herramienta de IA interna en el trabajo diario, y en mis proyectos trabajo con Claude como parte del flujo de desarrollo.',
  },

]

export const commits = [
  { hash: 'a1c3f02', msg: 'feat: Full Stack Web Certified Programmer en Digital House', date: '2022' },
  { hash: 'b7e91d4', msg: 'feat: empezar Ciencias de la Computación en UADE', date: '2022' },
  { hash: 'c2f8a6e', msg: 'feat: completar la React Academy de Globant', date: '2024' },
  { hash: 'd94b1c7', msg: 'feat: Web Developer en Globant, React + TypeScript en equipo Scrum', date: '2024 – 2025' },
  { hash: 'e5a0d38', msg: 'feat: StayHub, plataforma de reservas en Java + Spring Boot', date: '2025' },
  { hash: 'f13c7b9', msg: 'feat: sitio web de LEB Entertainment en WordPress', date: '2025' },
  { hash: '0a6e2f5', msg: 'feat: Car Rental, app full-stack en TypeScript deployada', date: '2026' },
  { hash: '1d9b4e8', msg: 'feat: postularme a Xeroo', date: 'hoy' },
]

export type DiffLine = { type: 'ctx' | 'add'; text: string }

export const diff: DiffLine[] = [
  { type: 'ctx', text: "import type { Developer } from './types'" },
  { type: 'ctx', text: '' },
  { type: 'ctx', text: 'export const devTeam: Developer[] = [' },
  { type: 'ctx', text: '  ...currentTeam,' },
  { type: 'add', text: '  {' },
  { type: 'add', text: "    name: 'Nahuel Menichetti'," },
  { type: 'add', text: "    role: 'Full-Stack Developer'," },
  { type: 'add', text: "    stack: ['TypeScript', 'React', 'Node.js', 'Express', 'PostgreSQL', 'Prisma']," },
  { type: 'add', text: "    location: 'Buenos Aires'," },
  { type: 'add', text: "    modality: 'hybrid'," },
  { type: 'add', text: '    wantsToGrow: true,' },
  { type: 'add', text: '  },' },
  { type: 'ctx', text: ']' },
]
