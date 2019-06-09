The idea here is that you want to be able to publish a typescript library which exports the directory structure of the source
file, but you can't, so you instead create a package.ts file that is made of nested namespaces which reflects the structure of
the contents of your source folder. This generated package.ts file will become the main of the npm module.