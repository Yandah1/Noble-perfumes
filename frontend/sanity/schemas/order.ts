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
        validation: (Rule: any) => Rule.required()
      }
    ]
  };
  