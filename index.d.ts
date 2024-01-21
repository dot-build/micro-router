/// <reference types="node" />
/// <reference types="node/http" />

import { IncomingMessage, ServerResponse } from 'http';
type Handler = (req: IncomingMessage, res: ServerResponse, args: Record<string, string>) => void | Promise<void>;
type HttpHandler = (req: IncomingMessage, res: ServerResponse) => void;
declare const _default: (routes: Record<string, Handler>, notFound?: HttpHandler) => HttpHandler;
export default _default;
