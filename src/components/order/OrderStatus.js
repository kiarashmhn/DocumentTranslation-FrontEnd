export const OrderStatus = {
  COMPLETING: {
    name: "completing",
    french: "En attente de l'achèvement",
    persian: "در حال تکمیل"
  },
  WAITING_FOR_PAYMENT: {
    name: "waitingForPayment",
    french: "En attente de paiement",
    persian: "در انتظار پرداخت"
  },
  PENDING: {
    name: "pending",
    french: "En attente d'acceptation",
    persian: "در انتظار پذیرش"
  },
  IN_PROGRESS: {
    name: "inProgress",
    french: "En cours",
    persian: "در حال انجام"
  },
  COMPLETED: {
    name: "completed",
    french: "Fini",
    persian: "انجام شده"
  },
  CANCELLED: {
    name: "cancelled",
    french: "Annulé",
    persian: "لغو شده"
  },
  DELIVERED: {
    name: "delivered",
    french: "Livré",
    persian: "تحویل شده"
  },
  PRE_BILL: {
    name: "preBill",
    french: "En attente d'émission de devis",
    persian: "در انتظار صدور پیش فاکتور"
  }
};

export const getComplete = text => {
  if (OrderStatus[text])
    return OrderStatus[text].french + " / " + OrderStatus[text].persian;
  return null;
};

export const getFrench = text => {
  if (OrderStatus[text]) return OrderStatus[text].french;
  return null;
};

export const getPersian = text => {
  if (OrderStatus[text]) return OrderStatus[text].persian;
  return null;
};
