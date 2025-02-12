# Overview

Simple Node.js application to demonstrate the use of GitHub Actions

## Look Ma, no Makefile

All the tasks necessary for testing, building and deploying this code is already defined in `.github/workflows/` so why would you want to also create a `Makefile` for local development?  Now you can use [act](https://github.com/nektos/act) to run the actions locally!

Try these:

* `act -j test` - run the tests
* `act` - run the the entire pipeline
* `act -l` - view the execution graph

## secrets와 같은 github console에서 값을 확인하지 못할 때 팀원들과 공유하는 방법

1. age를 사용해서 팀원 전원이 개인키와 공개키를 생성한다.
2. 공개키를 aws secret manager와 같은 서비스에 저장한다.
3. 자신을 제외한 팀원들의 공개키를 2의 서비스에서 취득한다.
4. .secrets파일을 생성하여 github local actions에서 사용할 secrets의 key와 value를 정의한다.
5. age로 팀원들의 공개키를 사용하여 .secrets파일을 암호화한다.
6. 암호화된 채널에 암호화된 .secrets파일을 공유한다.
7. 6에서 공유받은 암호화된 .secrets파일을 각자의 개인키로 복호화한다.

## age 사용방법

1.age를 install(현재 내가 사용하고 있는 환경)

* mac or linux
  * `brew install age`

* Ubuntu 22.04+
  * `apt install age`

2.age-keygen으로 개인키와 공개키 생성

* `age-keygen -o age_key.txt`
* `age-keygen > age_key.txt`

3.생성한 공개키로 파일을 암호화(팀원들의 공개키로)

* `age -r age1l34vexrajea553qh5xpr0tejzs5l60zxmjk99pcgd2k7k7pxje4q83stul -o output_secrets.age .input_secrets`
* `age -r age1l34vexrajea553qh5xpr0tejzs5l60zxmjk99pcgd2k7k7pxje4q83stul .input_secrets > output_secrets.age`
* `age -R recipients.txt .input_secrets > output_secrets.age`
* `age -R recipients.txt -o output_secrets.age .input_secrets`
* 팀원이 많은 경우 -R을 사용해서 공개키를 저장한 파일을 만들어서 사용하면 편리

4.암호화된 파일을 개인키로 복호화

* `age -d -i age_key.txt -o .decrypted_secrets output_secrets.age`
* `age -d -i age_key.txt output_secrets.age > .decrypted_secrets`

## age-keygen으로 생성한 개인키,공개키를 암호화된 파일로 만든 뒤 복호화에 사용하는 방법

1.사용하는 이유

* 개인키를 자신의 컴퓨터(whole system)에 저장하고 있다면 문제없지만 원격 저장소에 보관할 경우에는\
  passphrase를 사용하여 id파일(개인키, 공개키)을 암호화하기 위해
* 개인적으로는 passphrase가 보안을 크게 향상시킬 것 같진 않다.
* 생성한 뒤에 터미널에 공개키가 출력되지만 이 공개키를 다른 파일에 보관하거나 보관하지 않는다면\
  passphrase를 사용하여 암호화된 id파일을 복호화하여 확인해야하니 번거롭다.

2.사용방법

* `age-keygen | age -p > en_p.age`를 입력하면 passphrase를 입력해서 파일 생성
* `age -r age13mzzgaylmdmvs4x5e4qhp7n6h0wn2m7q7hzn5s3p5f8g2g3wpgvskrnujz .input_secrets > output_secrets.age`로 암호화
* `age -d -i en_p.age output_secrets.age > .decrypted_secrets`를 입력한 뒤 passphrase를 입력해서 복호화


Reference: [age GitHub repository](https://github.com/FiloSottile/age)
