import { Comment as IComment } from 'src/types/Comment'

interface CollapseBranchProps {
  nodes: IComment[]
  collapsedRoots: Record<string, boolean>
  parentId: IComment['id']
}

export const getCollapsedNodes = ({
  nodes,
  collapsedRoots,
  parentId,
}: CollapseBranchProps) => {
  const collapsedComments: IComment[] = []
  const parentIndex = nodes.findIndex((e) => e.id === parentId)
  const parentComment = nodes[parentIndex]
  let isInCollapsed = false
  let subCollapsedRoot: IComment = null

  for (let i = parentIndex + 1; i < nodes.length - 1; i++) {
    const current = nodes[i]
    const next = nodes[i + 1]
    if (isInCollapsed && next.level <= subCollapsedRoot.level) {
      isInCollapsed = false
    } else if (!isInCollapsed) {
      collapsedComments.push(current)

      // Thread has collapsed sub-thread
      if (collapsedRoots[current.id]) {
        isInCollapsed = true
        subCollapsedRoot = current
      }
    }

    if (next.level <= parentComment.level) break
  }

  return {
    collapsedComments,
    parentCommentId: parentComment.id,
  }
}
