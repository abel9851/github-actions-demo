# Overview
Simple Node.js application to demonstrate the use of GitHub Actions

# Look Ma, no Makefile!
All the tasks necessary for testing, building and deploying this code is already defined in `.github/workflows/` so why would you want to also create a `Makefile` for local development?  Now you can use [act](https://github.com/nektos/act) to run the actions locally!

Try these:

* `act -j test` - run the tests
* `act` - run the the entire pipeline
* `act -l` - view the execution graph

# secrets와 같은 github console에서 값을 확인하지 못할 때 팀원들과 공유하는 방법
1. age를 사용해서 팀원 전원이 개인키와 공개키를 생성한다.
2. 공개키를 aws secret manager와 같은 서비스에 저장한다.
3. 자신을 제외한 팀원들의 공개키를 2의 서비스에서 취득한다.
4. .secrets파일을 생성하여 github local actions에서 사용할 secrets의 key와 value를 정의한다.
5. age로 팀원들의 공개키를 사용하여 .secrets파일을 암호화한다.
6. 암호화된 채널에 암호화된 .secrets파일을 공유한다.
7. 6에서 공유받은 암호화된 .secrets파일을 각자의 개인키로 복호화한다.

Reference  
https://github.com/FiloSottile/age
