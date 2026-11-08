/**
 * links.js · Enlaces del footer, fuentes de los conceptos y recursos.
 *
 * Política de URLs: nunca inventar una URL.
 * - DOCS: páginas de code.claude.com verificadas el 01-11-2026.
 * - BIBLIO: fuentes 34–57 de fuentes/bibliografia-curso.md (entregadas por el instructor).
 * - ACADEMY_COURSES: URL de cada curso verificada en el catálogo oficial
 *   (anthropic.skilljar.com) el 07-11-2026: HTTP 200 y título coincidente.
 */

export const ACADEMY_CATALOG = 'https://academy.claude.com/es';

const SKILLJAR = 'https://anthropic.skilljar.com';

/** Cursos de Anthropic Academy mencionados en las unidades. */
export const ACADEMY_COURSES = {
  aiFluency: { titulo: 'AI Fluency: Framework & Foundations', url: `${SKILLJAR}/ai-fluency-framework-foundations`, verificado: true },
  aiFluencyBuilders: { titulo: 'AI Fluency for Builders', url: `${SKILLJAR}/ai-fluency-for-builders`, verificado: true },
  claude101: { titulo: 'Claude 101', url: `${SKILLJAR}/claude-101`, verificado: true },
  claudeCode101: { titulo: 'Claude Code 101', url: `${SKILLJAR}/claude-code-101`, verificado: true },
  claudeCodeInAction: { titulo: 'Claude Code in Action', url: `${SKILLJAR}/claude-code-in-action`, verificado: true },
  agentSkills: { titulo: 'Introduction to agent skills', url: `${SKILLJAR}/introduction-to-agent-skills`, verificado: true },
  subagents: { titulo: 'Introduction to subagents', url: `${SKILLJAR}/introduction-to-subagents`, verificado: true },
  mcp: { titulo: 'Introduction to Model Context Protocol', url: `${SKILLJAR}/introduction-to-model-context-protocol`, verificado: true },
  mcpAdvanced: { titulo: 'Model Context Protocol: Advanced Topics', url: `${SKILLJAR}/model-context-protocol-advanced-topics`, verificado: true },
  aiNativeSdlc: { titulo: 'AI-native SDLC playbook', url: 'https://academy.claude.com/courses/ai-native-sdlc-playbook', verificado: true },
  deployingEnterprise: { titulo: 'Deploying Claude Enterprise with Confidence', url: `${SKILLJAR}/deploying-claude-enterprise-with-confidence`, verificado: true },
  claudePlatform101: { titulo: 'Claude Platform 101', url: `${SKILLJAR}/claude-platform-101`, verificado: true },
};

/** Convierte un curso de la Academy en una tarjeta de la pestaña Videos. */
export const academyVideo = (key, nota = '') => ({
  ...ACADEMY_COURSES[key],
  origen: 'Anthropic Academy',
  duracion: '',
  nota,
});

const cc = (path, titulo) => ({ titulo, url: `https://code.claude.com/docs/en/${path}` });

/** Documentación oficial de Claude Code (verificada). */
export const DOCS = {
  home: { titulo: 'Documentación de Claude Code', url: 'https://code.claude.com/docs' },
  overview: cc('overview', 'Claude Code overview'),
  quickstart: cc('quickstart', 'Quickstart'),
  bestPractices: cc('best-practices', 'Best practices for Claude Code'),
  commonWorkflows: cc('common-workflows', 'Common workflows'),
  memory: cc('memory', 'Memory (CLAUDE.md)'),
  contextWindow: cc('context-window', 'Context window'),
  commands: cc('commands', 'Commands'),
  permissionModes: cc('permission-modes', 'Permission modes (plan mode)'),
  permissions: cc('permissions', 'Permissions'),
  sandboxing: cc('sandboxing', 'Sandboxing'),
  security: cc('security', 'Security'),
  settings: cc('settings', 'Settings'),
  checkpointing: cc('checkpointing', 'Checkpointing (rewind)'),
  subAgents: cc('sub-agents', 'Create custom subagents'),
  skills: cc('skills', 'Agent Skills'),
  hooks: cc('hooks', 'Hooks reference'),
  hooksGuide: cc('hooks-guide', 'Hooks guide'),
  mcp: cc('mcp', 'Connect Claude Code to tools via MCP'),
  headless: cc('headless', 'Non-interactive mode (claude -p)'),
  githubActions: cc('github-actions', 'Claude Code GitHub Actions'),
  codeReview: cc('code-review', 'Code Review'),
  codeReviewCustomize: cc('code-review-customize', 'Customize Code Review'),
  analytics: cc('analytics', 'Track team usage with analytics'),
  costs: cc('costs', 'Manage costs effectively'),
  modelConfig: cc('model-config', 'Model configuration'),
  sessions: cc('sessions', 'Manage sessions'),
  securityGuidance: cc('security-guidance', 'Security guidance plugin'),
  pluginsOverview: cc('plugins/overview', 'Plugins overview'),
  // Versiones en español entregadas en la bibliografía del curso
  jetbrainsEs: { titulo: 'IDEs de JetBrains (en español)', url: 'https://code.claude.com/docs/es/jetbrains' },
  codeReviewLocalEs: { titulo: 'Revisa localmente con /code-review (en español)', url: 'https://code.claude.com/docs/es/code-review-local' },
  dataUsageEs: { titulo: 'Uso de datos (en español)', url: 'https://code.claude.com/docs/es/data-usage' },
};

/** Estándares abiertos. */
export const STANDARDS = {
  agentsMd: { titulo: 'AGENTS.md · estándar abierto', url: 'https://agents.md' },
  agentSkills: { titulo: 'Agent Skills · estándar abierto', url: 'https://agentskills.io' },
  mcp: { titulo: 'Model Context Protocol', url: 'https://modelcontextprotocol.io' },
};

/** Otras fuentes citadas en la bibliografía del curso (fuentes/bibliografia-curso.md). */
export const BIBLIO = {
  osmani: { titulo: 'Osmani · Beyond Vibe Coding (O’Reilly, 2025)', url: 'https://www.oreilly.com/library/view/beyond-vibe-coding/9798341634749' },
  martinelli: { titulo: 'Martinelli · Spec-Driven Development (Apress, 2026)', url: 'https://link.springer.com/book/9798868828508' },
  planificador: { titulo: 'planificador-proyectos-web (Skill del instructor, MIT)', url: 'https://github.com/ffelipecuevasc/planificador-proyectos-web' },
  agentsMdSupport: { titulo: 'Classmethod · Claude Code v2.1.277–278: soporte de AGENTS.md', url: 'https://dev.classmethod.jp/en/articles/20260919-cc-updates-v2-1-278/' },
  dockerPostgres: { titulo: 'Docker Hub · imagen oficial postgres', url: 'https://hub.docker.com/_/postgres' },
  pluginsEs: { titulo: 'Plugins de Claude Code (en español)', url: 'https://docs.claude.com/es/docs/claude-code/plugins' },
  pluginsReference: { titulo: 'Plugins reference', url: 'https://docs.claude.com/en/docs/claude-code/plugins-reference' },
  postgresMcp: { titulo: 'Postgres MCP Pro (servidor MCP de terceros)', url: 'https://mcp.so/server/postgres-mcp' },
  readDenyRoutes: { titulo: 'DEV · Las reglas deny de Read dejan pasar 4 de 11 rutas', url: 'https://dev.to/rulestack/claude-codes-read-deny-rules-let-4-of-11-routes-through-grep-r-a-python-one-liner-and-two-ajf' },
  claudeTag: { titulo: 'Claude Help Center · What is Claude Tag?', url: 'https://support.claude.com/en/articles/15594475-what-is-claude-tag' },
  certEligibility: { titulo: 'Who can take a Claude certification exam', url: 'https://anthropic-partners.skilljar.com/page/certification-eligibility' },
  codeMigrationBlog: { titulo: 'Claude Blog · AI code migration', url: 'https://claude.com/blog/ai-code-migration' },
  dora: { titulo: 'DORA · métricas de entrega de software', url: 'https://dora.dev/' },
  aiNativeSdlcEs: { titulo: 'Manual de estrategias de SDLC nativo de IA', url: 'https://claude.com/es/resources/articles/the-ai-native-sdlc-playbook' },
};

/** Repositorio con los proyectos de las demos y los talleres. */
export const MATERIAL_REPO = { titulo: 'Repositorio de material (demos y talleres)', url: 'https://github.com/ffelipecuevasc/material-curso-ia-desarrolladores' };

/** Columna "Enlaces de interés" del footer. */
export const FOOTER_LINKS = {
  academy: { titulo: 'Anthropic Academy', url: ACADEMY_CATALOG },
  recommendedCourses: [
    ACADEMY_COURSES.claudeCodeInAction,
    ACADEMY_COURSES.claudeCode101,
    ACADEMY_COURSES.agentSkills,
    ACADEMY_COURSES.mcp,
    ACADEMY_COURSES.aiFluency,
  ],
  docs: DOCS.home,
  standards: [
    { titulo: 'agents.md', url: 'https://agents.md' },
    { titulo: 'agentskills.io', url: 'https://agentskills.io' },
  ],
};
