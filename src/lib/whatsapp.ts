import type { CartItem, Neighborhood } from './types';
import { RESTAURANT } from './data';
import { formatPrice } from './format';

function escapeMarkdown(text: string): string {
  return text.replace(/([*_~`])/g, '\\$1');
}

type OrderData = {
  customerName: string;
  customerPhone: string;
  address: string;
  neighborhood: Neighborhood;
  paymentMethod: string;
  notes: string;
  items: CartItem[];
};

export function buildWhatsAppUrl(data: OrderData): string {
  const subtotal = data.items.reduce(
    (sum, item) => sum + item.priceBRL * item.qty,
    0
  );
  const fee = data.neighborhood.feeBRL;
  const total = subtotal + fee;

  const lines: string[] = [];
  lines.push(`*NOVO PEDIDO — ${escapeMarkdown(RESTAURANT.name)}*`);
  lines.push('');
  lines.push(`*Cliente:* ${escapeMarkdown(data.customerName)}`);
  lines.push(`*Telefone:* ${escapeMarkdown(data.customerPhone)}`);
  lines.push(`*Endereço:* ${escapeMarkdown(data.address)}`);
  lines.push(`*Bairro:* ${escapeMarkdown(data.neighborhood.name)}`);
  if (data.neighborhood.note) {
    lines.push(`*Obs. bairro:* ${escapeMarkdown(data.neighborhood.note)}`);
  }
  lines.push('');
  lines.push('*ITENS DO PEDIDO:*');
  data.items.forEach((item, index) => {
    lines.push(
      `${index + 1}. ${item.qty}x ${escapeMarkdown(item.name)} — ${formatPrice(
        item.priceBRL * item.qty
      )}`
    );
  });
  lines.push('');
  lines.push(`*Subtotal:* ${formatPrice(subtotal)}`);
  lines.push(`*Taxa de entrega:* ${formatPrice(fee)}`);
  lines.push(`*TOTAL:* ${formatPrice(total)}`);
  lines.push('');
  lines.push(`*Forma de pagamento:* ${escapeMarkdown(data.paymentMethod)}`);
  if (data.notes.trim()) {
    lines.push(`*Observações:* ${escapeMarkdown(data.notes.trim())}`);
  }

  const text = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${RESTAURANT.whatsapp}?text=${text}`;
}
