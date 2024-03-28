import { useMutation } from "@tanstack/react-query"
export const useMotationHooks = (fnCallBack) => {
    const motation = useMutation({
        mutationFn: fnCallBack
    }) 
    return motation
}