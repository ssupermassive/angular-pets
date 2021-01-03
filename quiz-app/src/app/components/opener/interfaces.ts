export interface IPreloadConfig {
    /**
     * Сервис, который будет запрашивать данные
     */
    service: object;

    /**
     * Название метода сервиса, который будет вызван
     */
    methodName: string;

    /**
     * Название поля, в котором предзагруженные данные будут отправленны в диалог
     */
    resultFieldName: string;

    /**
     * Параметры метола сервиса
     */
    methodParams?: any[];
}

export interface IDialogOptions {
    template: any;
    width?: string;
    maxWidth?: string;
    minWidth?: string;
    height?: string;
    maxHeight?: string;
    minHeight?: string;
    data?: object;
    preloadConfig?: IPreloadConfig[];
}
