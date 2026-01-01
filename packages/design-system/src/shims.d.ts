declare module '*.astro' {
    const Component: any;
    export default Component;
    export interface Props {
        [key: string]: any;
    }
}
