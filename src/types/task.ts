/**
 * @description Task type definition (할 일 타입 정의)
 * @author 장민규
 * @created 2025-11-20
 */
export interface Task {
    id: string;
    title: string;
    status: TaskStatus;
    dueDate?: string | null;
}

/**
 * @description Task status type definition (할 일 상태 타입 정의)
 * @author 장민규
 * @created 2025-11-20
 */
export type TaskStatus = 'todo' | 'doing' | 'done';

/**
 * @description Task filter type definition (할 일 필터 타입 정의)
 * @author 장민규
 * @created 2025-11-20
 */
export type TaskFilter = 'all' | TaskStatus;

/**
 * @description Task sort type definition (할 일 정렬 타입 정의)
 * @author 장민규
 * @created 2025-11-20
 */
export type TaskSort = 'titleAsc' | 'titleDesc' | 'dueDateAsc' | 'dueDateDesc' | null;