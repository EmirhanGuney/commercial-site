const ORDER_STATUS = Object.freeze({
    PENDING_APPROVAL: 'onay bekleniyor',
    APPROVED: 'onaylandı',
    REJECTED: 'onaylanmadı',
    PREPARING: 'hazırlanıyor',
    SHIPPED: 'kargoya verildi',
    DELIVERED: 'teslim edildi',
    CANCELLED: 'iptal edildi',
    RETURNED: 'iade edildi',
    STORE_PICKUP: 'mağazadan alınacak'
});

export default ORDER_STATUS;