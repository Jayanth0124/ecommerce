import React from 'react';
import { motion } from 'framer-motion';
import { Package, Download, Eye, Truck, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Orders: React.FC = () => {
  const { orders } = useStore();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'processing':
        return <Package className="w-5 h-5 text-blue-400" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-purple-400" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Package className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/10';
      case 'processing':
        return 'text-blue-400 bg-blue-400/10';
      case 'shipped':
        return 'text-purple-400 bg-purple-400/10';
      case 'delivered':
        return 'text-green-400 bg-green-400/10';
      case 'cancelled':
        return 'text-red-400 bg-red-400/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
    }
  };

  const downloadReceipt = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    // Create receipt content
    const receiptContent = `
Aurora Mobile Hub Phones - Order Receipt
================================

Order ID: ${order.id}
Date: ${new Date(order.orderDate).toLocaleDateString()}
Status: ${order.status.toUpperCase()}

Items:
${order.items.map(item => 
  `- ${item.phone.name} (${item.selectedColor}) x${item.quantity} - $${(item.phone.price * item.quantity).toFixed(2)}`
).join('\n')}

Subtotal: $${order.total.toFixed(2)}
Tax: $${(order.total * 0.08).toFixed(2)}
Total: $${(order.total * 1.08).toFixed(2)}

Shipping Address:
${order.shippingAddress.street}
${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}
${order.shippingAddress.country}

Thank you for shopping with Aurora Mobile Hub Phones!
    `;

    // Create and download file
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AuroraMobileHub-Receipt-${order.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-dark-950 pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Package className="w-24 h-24 text-gray-600 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-white mb-4">No orders yet</h1>
            <p className="text-gray-400 mb-8">Your order history will appear here once you make a purchase.</p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950 pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Order History</h1>
          <p className="text-gray-400">{orders.length} order{orders.length !== 1 ? 's' : ''} found</p>
        </motion.div>

        <div className="space-y-6">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-dark-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
                <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(order.status)}
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">Order #{order.id}</p>
                    <p className="text-gray-400 text-sm">
                      Placed on {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => downloadReceipt(order.id)}
                    className="flex items-center space-x-2 bg-primary-500/20 text-primary-400 px-4 py-2 rounded-lg hover:bg-primary-500/30 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Receipt</span>
                  </button>
                  <button className="flex items-center space-x-2 bg-white/5 text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
                    <Eye className="w-4 h-4" />
                    <span>Details</span>
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {order.items.map((item) => (
                  <div key={`${item.phone.id}-${item.selectedColor}`} className="flex items-center space-x-3">
                    <img
                      src={item.phone.image}
                      alt={item.phone.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm">{item.phone.name}</p>
                      <p className="text-gray-400 text-xs">{item.selectedColor} • Qty: {item.quantity}</p>
                      <p className="text-primary-400 text-sm font-semibold">${item.phone.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 border-t border-white/10">
                <div className="text-gray-400 text-sm mb-2 sm:mb-0">
                  <p>Shipping to: {order.shippingAddress.city}, {order.shippingAddress.state}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold text-lg">${(order.total * 1.08).toFixed(2)}</p>
                  <p className="text-gray-400 text-sm">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};