branch=$(git rev-parse --symbolic-full-name --abbrev-ref HEAD); 

if [[ $branch == "master" ]]; 
then 
    echo 'on master';
else 
    echo 'must be on master branch to publish'; 
    exit 1; 
fi;

if [[ `git status --porcelain` ]]; 
then 
    echo 'has uncommited changes'; 
    exit 1; 
else 
    echo 'no uncommited changes';
fi;
  
exit 0; 