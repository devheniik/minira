import {CreateMemberDto, MemberDto, UpdateMemberDto} from "@minira/server";
import {serviceBuilder} from "@/lib/service.builder.ts";

export const{
    useGetAllEntries: useGetAllMembers,
    useGetEntryById: useGetMemberById,
    useDeleteEntry: useDeleteMember,
    useCreateEntry: useCreateMember,
    useUpdateEntry: useUpdateMember
} = serviceBuilder<MemberDto, CreateMemberDto, UpdateMemberDto>('member')

console.log({
    useGetAllMembers,
    useGetMemberById,
    useDeleteMember,
    useCreateMember,
    useUpdateMember
})