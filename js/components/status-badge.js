/**
 * status-badge.js · Badge de estado de una unidad (ícono + texto).
 */
import { icon } from '../utils/icons.js';
import { STATUS_META } from '../utils/schedule.js';

export function statusBadge(status) {
  const meta = STATUS_META[status];
  return `<span class="status-badge status-badge--${status}">${icon(meta.icon)}<span>${meta.label}</span></span>`;
}
