import mongoose from 'mongoose';
import { OrderStatus } from '@mss-ticketing/common';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { Order } from './order';

interface TicketAttrs {
  id?: string;
  title: string;
  price: number;
}

export interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  version: number;
  isReserved(): Promise<boolean>;
}

interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
  findByEvent(event: {id: string, version: number}): TicketDoc | null;
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

ticketSchema.set('versionKey', 'version');
ticketSchema.plugin(updateIfCurrentPlugin);

ticketSchema.statics.findByEvent = async (event: { id: string, version: number }) => {
  return await Ticket.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};

ticketSchema.statics.build = (attrs: TicketAttrs) => {
  const attrsToAssign: any = { ...attrs };
  if (attrs.id) {
    attrsToAssign._id = attrs.id;
  }
  delete attrsToAssign.id;
  return new Ticket(attrsToAssign);
};

ticketSchema.methods.isReserved = async function () {
  // this === the ticket document that we just called 'isReserved' on
  const existingOrder = await Order.findOne({
    ticket: this,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
      ],
    },
  });
  return !!existingOrder;
};

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket };
