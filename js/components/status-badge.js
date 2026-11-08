/**
 * status-badge.js · Badge de estado de una unidad (ícono + texto).
 * Los estados que no se muestran (ver isStatusShown) no dibujan badge.
 */
import { icon } from '../utils/icons.js';
import { isStatusShown, STATUS_META } from '../utils/schedule.js';

export function statusBadge(status) {
  if (!isStatusShown(status)) return '';
  const meta = STATUS_META[status];
  return `<span class="status-badge status-badge--${status}">${icon(meta.icon)}<span>${meta.label}</span></span>`;
}
