import { IconNames } from "@tonkeeper/uikit";

export type WalletAddress = {
  friendly: string;
  raw: string;
  version: string;
};

export enum ClientEventType {
  Action = 'Action',
  Date = 'Date',
}

export type ClientEvents = ClientEvent[];

export type ClientEventDate = {
  type: ClientEventType.Date;
  id: string;
  date: string;
};

export type ClientEventAction = {
  type: ClientEventType.Action;
  id: string;
  bottomCorner?: boolean;
  topCorner?: boolean;
  iconName: IconNames;
  title: string;
  value?: string;
  subvalue?: string;
  subtitle?: string;
  isReceive?: boolean;
  timestamp: number;
  nftAddress?: string;
};

export type ClientEvent = ClientEventDate | ClientEventAction;

export type GroupedActionsByDate = { [date: string]: ClientEventAction[] };