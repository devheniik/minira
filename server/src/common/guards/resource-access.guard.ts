import { ExecutionContext } from '@nestjs/common';
import { ResourceAccessService } from '../../common/interfaces/resource-access.interface'
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';

const defaultAuthorizeAccess = async <T extends { id: number, companyId: number }>(resource: T, user: UserEntity) => {
    return resource.companyId === user.companyId;
}

export async function checkResourceAccess<T>(
    context: ExecutionContext,
    resourceService: ResourceAccessService<T>,
    authorizeAccess: (resource: T, user: UserEntity) => Promise<boolean> = async (resource, user) => await defaultAuthorizeAccess(resource as { id: number, companyId: number }, user)
) {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const resourceId = Number(request.params.id);
    
    if (!resourceId) {
        throw new BadRequestException('No resource ID provided');
    }

    try {
        const resource = await resourceService.findOne(resourceId);

        if(!resource) {
            throw new NotFoundException(`Resource with id ${resourceId} not found`);
        }
  
        return authorizeAccess(resource, user);
    } catch (error) {
        console.error('Error in resource access check:', error);
        throw error;
    }
}
