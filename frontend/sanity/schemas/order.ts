// In schema.js file
export default {
    name: 'order',
    title: 'Order',
    type: 'document',
    fields: [
      {
        name: 'order_id',
        title: 'Order ID',
        type: 'string',
        validation: (Rule: any) => Rule.required()
      },
      {
        name: 'status',
        title: 'Status',
        type: 'string',
        options: {
          list: [
            { title: 'Pending', value: 'pending' },
            { title: 'Processing', value: 'processing' },
            { title: 'Shipped', value: 'shipped' },
            { title: 'Delivered', value: 'delivered' }
          ],
          layout: 'radio' // Display as radio buttons
        },
        validation: (Rule: any) => Rule.required()
      }
    ]
  };
  