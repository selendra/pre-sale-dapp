import { message } from "antd";

export function ErrorHandling(err) {
  if(err.code === 4001) message.error('The request was rejected!');
  if(err.code === -32603) message.error(err.data.message);
}