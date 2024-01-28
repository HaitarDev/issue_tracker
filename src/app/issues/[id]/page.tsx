async function getIssue(id: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/issues/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch issues");
    }
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
async function IssuePage({ params }: { params: { id: string } }) {
  const issue = await getIssue(params.id);

  return (
    <div>
      {issue?.title}
      <div>{issue.description}</div>
    </div>
  );
}
export default IssuePage;
