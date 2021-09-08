
# cant use interactive settings in vagrant provision.
export DEBIAN_FRONTEND=noninteractive

# 環境変数読み込み
cat /vagrant/.env | sed 's/# .*$//' | xargs -I {} echo export {} >> /home/vagrant/.bashrc
cat /vagrant/.env | sed 's/# .*$//' | xargs -I {} echo export {} >> ~/.bashrc
source ~/.bashrc

apt update && apt upgrade -y 

apt install -y xz-utils

NODE_VERSION=v16.8.0

wget https://nodejs.org/dist/${NODE_VERSION}/node-${NODE_VERSION}-linux-x64.tar.xz \
&& tar Jxvf node-${NODE_VERSION}-linux-x64.tar.xz \
   && mv node-${NODE_VERSION}-linux-x64/bin/* /usr/local/bin/ \
   && mv node-${NODE_VERSION}-linux-x64/lib/* /usr/local/lib/ \
   && mv node-${NODE_VERSION}-linux-x64/share/* /usr/local/share/ \
   && mv node-${NODE_VERSION}-linux-x64/include/* /usr/local/include/ \
   && rm -rf node-${NODE_VERSION}-linux-x64 node-${NODE_VERSION}-linux-x64.tar.xz

npm install -g yarn

# fix for mojibake
apt install -y nkf

# set Asia/Tokyo
timedatectl set-timezone Asia/Tokyo

# chrome install for using selenium

# chromeで使うamd64bitに依存するパッケージをインストールするためにamd64bitを有効化
dpkg --add-architecture amd64 \
    && dpkg --print-foreign-architectures \
    && apt-get update

# RUN apt install -y libappindicator1 fonts-liberation libasound2 libnspr4 libnss3 libxss1 lsb-release xdg-utils
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
    && apt install -y ./google-chrome-stable_current_amd64.deb \
    && rm ./google-chrome-stable_current_amd64.deb

# 日本語のフォントを入れるために必要。入れないとchromeが文字化けする
apt install -y task-japanese \
    && locale-gen ja_JP.UTF-8 \
    && localedef -f UTF-8 -i ja_JP ja_JP

apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# set bash function
su - vagrant -c 'cat < /vagrant/function.sh >> ~/.bashrc'
