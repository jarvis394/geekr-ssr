export default interface ArticleLabel {
  data: Record<string, string>
  type:
    | 'technotext2022'
    | 'technotext2021'
    | 'technotext2020'
    | 'translation'
    | 'sandbox'
    | 'recovery'
    | 'tutorial'
}
