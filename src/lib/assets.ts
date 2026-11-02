export const SITE_NAME = 'Varoq';

/**
 * WhatsApp contact number in international format, digits only, no "+"
 * (e.g. '2348012345678'). The WhatsApp button stays hidden until this is set.
 */
export const WHATSAPP_NUMBER = '2349067328783';
export const WHATSAPP_MESSAGE = `Hi ${SITE_NAME}, I'd like to talk about a project.`;
export const whatsappHref = () =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
