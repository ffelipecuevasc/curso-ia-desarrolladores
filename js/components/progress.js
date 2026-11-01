/**
 * progress.js · Barra "Unidades abiertas: X de 10".
 */
export const progressMarkup = () => `
  <div class="course-progress flex flex-col gap-2 w-full max-w-sm" data-course-progress>
    <p class="text-sm text-text-muted m-0">Unidades abiertas: <strong class="text-heading tabular" data-progress-count>0 de 10</strong></p>
    <div class="course-progress__track" role="progressbar" aria-label="Unidades abiertas" aria-valuemin="0" aria-valuemax="10" aria-valuenow="0">
      <span class="course-progress__fill" style="width:0%"></span>
    </div>
  </div>`;

export function updateProgress(root, { unlockedCount, total }) {
  root.querySelectorAll('[data-course-progress]').forEach((element) => {
    element.querySelector('[data-progress-count]').textContent = `${unlockedCount} de ${total}`;
    const bar = element.querySelector('[role="progressbar"]');
    bar.setAttribute('aria-valuenow', String(unlockedCount));
    bar.setAttribute('aria-valuemax', String(total));
    bar.setAttribute('aria-valuetext', `${unlockedCount} de ${total} unidades abiertas`);
    element.querySelector('.course-progress__fill').style.width = `${(unlockedCount / total) * 100}%`;
  });
}
