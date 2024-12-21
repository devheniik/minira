import { zh } from "@/lib/zod.helper.ts";
import * as z from "zod";

const createUserFormSchema = z.object({
    name: zh.min(2).max(255),
    description: zh.min(2).max(9999),
});

export default createUserFormSchema;
