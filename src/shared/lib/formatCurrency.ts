export const formatCurrency = (currency: string) => {
    switch (currency) {
        case 'USD':
            return '$';
        case 'EUR':
            return '€'; 
        default:
            break;
    }
}