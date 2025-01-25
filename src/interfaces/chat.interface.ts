export interface IMessage { role: string, content: string };

export interface IChatHistoryList {
    [key: string]: IMessage[]
}
