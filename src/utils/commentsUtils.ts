import { Comment as IComment } from 'src/types/Comment'

export interface GetArticleCommentsOptions {
  sortByKarma: boolean
}

export const parseComments = (
  nodes: Record<string, IComment>,
  options?: Partial<GetArticleCommentsOptions>
) => {
  const root: IComment[] = []
  for (const id in nodes) {
    const comment = nodes[id]
    const parent = comment.parentId ? nodes[comment.parentId] : null
    const commentChildren = comment.children as unknown as string[]
    comment.children = []
    comment.childrenIds = commentChildren

    if (parent) {
      parent.children.push(comment)
    } else {
      root.push(comment)
    }
  }

  if (options?.sortByKarma) root.sort((a, b) => b.score - a.score)

  return root
}

export const flatten = (nodes: IComment[], a = []) => {
  nodes.forEach((e) => {
    a.push(e)
    flatten(e.children, a)
  })
  return a
}

export const createBranches = (nodes: IComment[]) => {
  const branches: IComment['branches'] = []
  for (let i = 0; i < nodes.length; i++) {
    const currentNode = nodes[i]
    const nextNode = nodes[i + 1]
    const currentBranchIndex = currentNode.level - 1
    const currentBranch = branches[currentBranchIndex]
    const childrenIdsLength = currentBranch?.childrenIds?.length
    nodes[i].branches = [...branches]

    if (!nextNode) {
      continue
    }

    if (
      currentBranch &&
      (childrenIdsLength == 0 ||
        currentBranch.childrenIds[childrenIdsLength - 1] === currentNode.id)
    ) {
      branches[currentBranchIndex] = {
        ...currentBranch,
        noBorder: true,
        hidden: true,
      }
      nodes[i].branches[currentBranchIndex] = {
        ...nodes[i].branches[currentBranchIndex],
        noBorder: true,
        hidden: false,
      }
    }

    if (currentNode.level < nextNode.level) {
      branches.push({
        parentId: currentNode.id,
        hidden: currentNode.children.length < 2,
        noBorder: false,
        childrenIds: currentNode.childrenIds,
      })
    } else if (currentNode.level > nextNode.level) {
      branches.splice(nextNode.level, currentNode.level)
      nodes[i].branches[currentBranchIndex] = {
        ...nodes[i].branches[currentBranchIndex],
        noBorder: true,
        hidden: false,
      }
    }
  }
  return nodes
}

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
